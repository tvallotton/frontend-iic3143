import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PublicationCard from "../../publication/publicationCard";
import "@testing-library/jest-dom";
import { PublicationFromBackend } from "../../publication/types";

describe("PublicationCard Component", () => {
    const mockPublication: PublicationFromBackend = {
        id: 1,
        status: "active",
        language: "English",
        genres: ["fiction"],
        title: "Test Publication Title",
        author: "Author Name",
        image: "test-image.jpg",
        price: 100,
        type: "Venta",
        bookState: "New",
        ownerId: 1,
        owner: {
            id: "test_owner_id",
            name: "Owner Name",
        },
        description: "",
        booksOfInterest: "",
        bookId: ""
    };

    it("renders correctly with all props", () => {
        render(
            <Router>
                <PublicationCard publication={mockPublication} />
            </Router>
        );

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("src", mockPublication.image);
        expect(image).toHaveAttribute("alt", mockPublication.title);
        expect(screen.getByText("Test Publication Tit...")).toBeInTheDocument();
        expect(screen.getByText("Author Name")).toBeInTheDocument();

        expect(screen.getByText("$100")).toBeInTheDocument();

        expect(screen.getByText("Venta")).toBeInTheDocument();
        expect(screen.getByText("New")).toBeInTheDocument();

        const ownerLink = screen.getByRole("link");
        expect(ownerLink).toHaveAttribute("href", `/profile/${mockPublication.ownerId}`);
        expect(screen.getByText("Owner Name")).toBeInTheDocument();
    });
});