import { render, screen } from "@testing-library/react";
import Footer from "../common/Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
    test("renders the PagePals logo", () => {
        render(<Footer />);
        const logoImage = screen.getByRole("img", { name: /PagePals logo/i });
        expect(logoImage).toBeInTheDocument();
    });

    test("displays the footer text correctly", () => {
        render(<Footer />);
        expect(screen.getByText(/Hecho con amor para todos los lectores 🤍./i)).toBeInTheDocument();
        expect(screen.getByText(`© ${new Date().getFullYear()} PagePals. Todos los derechos reservados.`)).toBeInTheDocument();
    });
});