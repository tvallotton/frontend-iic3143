import { renderHook, act } from "@testing-library/react-hooks";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

describe("useDebouncedValue", () => {
    jest.useFakeTimers();

    it("should return the same value after the specified delay", async () => {
        const { result, rerender, waitForNextUpdate } = renderHook(
            ({ inputValue, delay }) => useDebouncedValue(inputValue, delay),
            { initialProps: { inputValue: "initial", delay: 500 } }
        );

        expect(result.current).toBe("initial");

        act(() => {
            rerender({ inputValue: "updated", delay: 500 });
            jest.advanceTimersByTime(100);
        });

        expect(result.current).toBe("initial");

        act(() => {
            jest.advanceTimersByTime(400); 
        });

        await act(async () => {
            await waitForNextUpdate();
        });
        expect(result.current).toBe("updated");
    });
  
    jest.useRealTimers();
});