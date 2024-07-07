import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Landing from "../landing/Landing";
import "@testing-library/jest-dom";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), 
    Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

const mockPublications = [
    { id: "1", title: "Test Publication 1", author: "Author 1", image: "image1.jpg" },
    { id: "2", title: "Test Publication 2", author: "Author 2", image: "image2.jpg" },
];

describe("Landing Component", () => {
    beforeEach(() => {
        mockAxiosGet.mockResolvedValue({ data: mockPublications });
    });

    it("renders correctly and displays static elements", async () => {
        render(<Landing />, { wrapper: BrowserRouter });

        expect(screen.getByText("¡Únete a la comunidad de PagePals!")).toBeInTheDocument();
        expect(screen.getByText("Buscar ahora")).toBeInTheDocument();
        expect(screen.getByAltText("Librería")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText("Test Publication 1")).toBeInTheDocument();
            expect(screen.getByText("Author 1")).toBeInTheDocument();
        });
    });

    it("navigates to find page on button click", async () => {
        render(<Landing />, { wrapper: BrowserRouter });
        userEvent.click(screen.getByText("Buscar ahora"));
    });
});