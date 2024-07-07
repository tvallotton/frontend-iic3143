import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import { GenresProvider, useGenres } from "../../publication/components/context/genresContext";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const MockChildComponent = () => {
    const genres = useGenres();
    return <div>{genres.join(", ")}</div>;
};

describe("GenresProvider", () => {
    it("provides genres data to children", async () => {
        mockedAxios.get.mockResolvedValue({ data: ["Action", "Drama", "Comedy"] });

        const { getByText } = render(
            <GenresProvider>
                <MockChildComponent />
            </GenresProvider>
        );

        await waitFor(() => {
            expect(getByText("Action, Drama, Comedy")).toBeInTheDocument();
        });
        expect(mockedAxios.get).toHaveBeenCalledWith("publications/genres");
    });

    it("handles API call failure gracefully", async () => {
        mockedAxios.get.mockRejectedValue(new Error("API call failed"));
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        render(
            <GenresProvider>
                <MockChildComponent />
            </GenresProvider>
        );

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("Error fetching genres:", expect.any(Error));
        });

        consoleSpy.mockRestore();
    });
});