import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import PublicationForm from "../../publication/publicationCreate";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

describe("PublicationForm", () => {
    it("renders without crashing", () => {
        render(
            <BrowserRouter>
                <PublicationForm />
            </BrowserRouter>,
        );
        expect(screen.getByText(/¡Publica tu libro en PagePals!/i)).toBeInTheDocument();
    });

    it("updates state on input change", async () => {
        render(
            <BrowserRouter>
                <PublicationForm />
            </BrowserRouter>,
        );
        const searchInput = screen.getByPlaceholderText(/Título/i);
        await userEvent.type(searchInput, "Test Book");
        expect(searchInput).toHaveValue("Test Book");
    });

    it("submits form and navigates on success", async () => {
        mockAxiosPost.mockResolvedValue({ status: 201, data: { id: "123" } });
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => mockNavigate,
        }));

        render(
            <BrowserRouter>
                <PublicationForm />
            </BrowserRouter>,
        );

        const submitButton = screen.getByRole("button");
        await userEvent.click(submitButton);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/publications/123"), {
            timeout: 5000,
        });
    });

    it("searches books and updates state", async () => {
        const mockBooks = [{ id: "1", volumeInfo: { title: "Test Book", authors: ["Author"] } }];
        mockAxiosGet.mockResolvedValue({ data: { items: mockBooks } });
        render(
            <BrowserRouter>
                <PublicationForm />
            </BrowserRouter>,
        );
        const searchInput = screen.getByPlaceholderText(/Título/i);
        userEvent.type(searchInput, "Test Book");
        await new Promise((resolve) => setTimeout(resolve, 500));

        await waitFor(() => expect(axios.get).toHaveBeenCalled());
        await waitFor(() => expect(screen.getByText(/Test Book/i)).toBeInTheDocument());
    });
});
