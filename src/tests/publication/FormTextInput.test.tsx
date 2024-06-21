import { render, screen, fireEvent } from "@testing-library/react";
import FormTextInput from "../../publication/components/formTextInput";
import "@testing-library/jest-dom";

describe("FormTextInput Component", () => {
    const mockOnChange = jest.fn();

    it("renders input field for types other than description", () => {
        render(<FormTextInput label="Name" value="John Doe" onChange={mockOnChange} placeholder="Enter your name" type="text" name="name" id="name" />);

        const inputElement = screen.getByPlaceholderText("Enter your name");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", "text");
    });

    it("renders textarea for description type", () => {
        render(<FormTextInput label="Description" value="This is a test." onChange={mockOnChange} placeholder="Enter description" type="text" name="description" id="description" />);

        const textareaElement = screen.getByPlaceholderText("Enter description");
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement).toHaveProperty("tagName", "TEXTAREA");
    });

    it("calls onChange when input value changes", () => {
        render(<FormTextInput label="Email" value="" onChange={mockOnChange} placeholder="Enter your email" type="email" name="email" id="email" />);

        const inputElement = screen.getByPlaceholderText("Enter your email");
        fireEvent.change(inputElement, { target: { value: "test@example.com" } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    it("is disabled when disabled prop is true", () => {
        render(<FormTextInput label="Disabled Input" value="Cannot change this" onChange={mockOnChange} placeholder="Disabled input" type="text" name="disabledInput" id="disabledInput" disabled={true} />);

        const inputElement = screen.getByPlaceholderText("Disabled input");
        expect(inputElement).toBeDisabled();
    });
});