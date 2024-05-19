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
        <div className="flex flex-col items-center justify-start">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg mb-4">{description}</p>
            <div className="overflow-x-auto w-[700px]">
                <div className="flex flex-row justify-start items-start gap-x-32">
                    {items.map((item) => (
                        <a href={item.link} key={item.title} className="flex flex-col items-center w-32">
                            <img src={item.image} alt={item.title} className="rounded-md min-w-32" />
                            <p className="text-lg text-center">{item.title}</p>
                            {item.description && <p className="text-sm text-center">{item.description}</p>}
                        </a>
                    ))}
                </div>
            </div>
            <a href={viewAllLink} className="text-lg underline mt-4">Ver todos</a>
        </div>
    );
}
