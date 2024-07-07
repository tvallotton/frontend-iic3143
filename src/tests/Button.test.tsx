import { render, fireEvent } from "@testing-library/react";
import ButtonComponent from "../common/Button";
import "@testing-library/jest-dom";

describe("ButtonComponent", () => {
    it("should render with default props", () => {
        const handleClick = jest.fn();
        const { getByText } = render(<ButtonComponent text="Click me" onClick={handleClick} />);

        const buttonElement = getByText(/Click me/i);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass("bg-main-blue");
        expect(buttonElement).toHaveTextContent("Click me");
    });

    it("should render with custom colors", () => {
        const handleClick = jest.fn();
        const { getByText } = render(
            <ButtonComponent text="Click me" onClick={handleClick} color="bg-red-500" hoverColor="bg-red-700" />
        );

        const buttonElement = getByText(/Click me/i);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass("bg-red-500");
    });

    it("should call onClick when clicked", () => {
        const handleClick = jest.fn();
        const { getByText } = render(<ButtonComponent text="Click me" onClick={handleClick} />);

        const buttonElement = getByText(/Click me/i);
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should apply hover color", () => {
        const handleClick = jest.fn();
        const { getByText } = render(<ButtonComponent text="Click me" onClick={handleClick} />);
    
        const buttonElement = getByText(/Click me/i);
        fireEvent.mouseOver(buttonElement);
        expect(buttonElement).toHaveClass("hover:bg-dark-blue");
    });
});
