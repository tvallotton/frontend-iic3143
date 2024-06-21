import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadioButton from "../common/RadioButton"; 

describe("RadioButton", () => {
    const mockSetValue = jest.fn();

    beforeEach(() => {
        mockSetValue.mockClear();
    });

    it("renders correctly", () => {
        render(<RadioButton label="Option 1" value="1" selectedValue="1" setValue={mockSetValue} />);
        expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    });

    it("is checked when selectedValue matches value", () => {
        render(<RadioButton label="Option 1" value="1" selectedValue="1" setValue={mockSetValue} />);
        expect(screen.getByLabelText("Option 1")).toBeChecked();
    });

    it("is not checked when selectedValue does not match value", () => {
        render(<RadioButton label="Option 1" value="1" selectedValue="2" setValue={mockSetValue} />);
        expect(screen.getByLabelText("Option 1")).not.toBeChecked();
    });

    it("calls setValue with the correct value when clicked", () => {
        render(<RadioButton label="Option 1" value="1" selectedValue="2" setValue={mockSetValue} />);
        fireEvent.click(screen.getByLabelText("Option 1"));
        expect(mockSetValue).toHaveBeenCalledWith("1");
    });
});