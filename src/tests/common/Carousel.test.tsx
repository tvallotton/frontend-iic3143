import { render, screen } from "@testing-library/react";
import Carousel, { CarouselItem } from "../../landing/components/Carousel";
import "@testing-library/jest-dom";

describe("Carousel Component", () => {
    const carouselItems: CarouselItem[] = [
        { title: "Item 1", description: "Description 1", image: "image1.jpg", link: "/item1" },
        { title: "Item 2", description: "Description 2", image: "image2.jpg", link: "/item2" },
    ];

    const props = {
        title: "Test Carousel",
        description: "This is a test carousel",
        items: carouselItems,
        viewAllLink: "/view-all",
    };

    it("renders correctly with all props", () => {
        render(<Carousel {...props} />);

        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.description)).toBeInTheDocument();

        props.items.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            if (item.description) {
                expect(screen.getByText(item.description)).toBeInTheDocument();
            }
            const image = screen.getByAltText(item.title) as HTMLImageElement;
            expect(image.src).toContain(item.image);
        });

        const viewAllLink = screen.getByText("Ver todos");
        expect(viewAllLink).toBeInTheDocument();
        expect(viewAllLink.getAttribute("href")).toBe(props.viewAllLink);
    });
});