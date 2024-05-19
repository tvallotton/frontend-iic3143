export interface CarouselItem {
    title: string;
    description?: string;
    image: string;
    link: string;
}

interface CarouselProps {
    title: string;
    description: string;
    items: CarouselItem[];
    viewAllLink: string;
}

export default function Carousel({ title, description, items, viewAllLink }: CarouselProps) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg mb-4">{description}</p>
            <div className="flex justify-start items-start w-1/2 overflow-x-scroll">
                <div className="flex flex-row justify-start items-start gap-x-32">
                    {items.map((item) => (
                        <a href={item.link} key={item.title} className="flex flex-col items-center w-32">
                            <img src={item.image} alt={item.title} className="rounded-md" />
                            <p className="text-lg">{item.title}</p>
                            {item.description && <p className="text-sm">{item.description}</p>}
                        </a>
                    ))}
                </div>
            </div>
            <a href={viewAllLink} className="text-lg underline mt-4">Ver todos</a>
        </div>
    );
}
