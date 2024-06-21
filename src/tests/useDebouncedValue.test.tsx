import { render, act, screen } from "@testing-library/react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import "@testing-library/jest-dom";
 
function TestComponent({ inputValue, delay }: { inputValue: string, delay: number }) {
  const debouncedValue = useDebouncedValue(inputValue, delay);
  return <div>{debouncedValue}</div>;
}

describe("useDebouncedValue in a component", () => {
  jest.useFakeTimers();

  it("should return the same value after the specified delay", async () => {
    const { rerender } = render(<TestComponent inputValue="initial" delay={500} />);
    expect(screen.getByText("initial")).toBeInTheDocument();
    rerender(<TestComponent inputValue="updated" delay={500} />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByText("initial")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(await screen.findByText("updated")).toBeInTheDocument();
  });

  jest.useRealTimers();
});