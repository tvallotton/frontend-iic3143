import { Link } from "react-router-dom";

interface Owner {
    name: string;
}

interface Publication {
    id: number;
    image: string;
    title: string;
    author: string;
    price?: number;
    type: string;
    owner: Owner;
    state: string;
    ownerId: number;
}

interface PublicationCardProps {
    publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
    const maxLength = 20;

    const truncate = (str: string, max: number) => {
        return str.length > max ? str.substring(0, max) + "..." : str;
    };

    return (
        <div className="flex flex-col items-center border border-gray-300 p-5 m-2 rounded-lg w-64 h-80 shadow-md bg-white">
            <img src={publication.image} alt={publication.title} className="w-full h-32 object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-bold text-gray-700">{truncate(publication.title, maxLength)}</h2>
            <p className="text-md text-gray-600">{truncate(publication.author, maxLength)}</p>
            <div className="flex justify-between w-full mt-2">
                {publication.type != "Permuta" && <p className="text-md text-gray-600">${publication.price}</p>}
                <p className="text-sm text-gray-500">{truncate(publication.type, maxLength)}</p>
            </div>
            <div className="flex justify-between w-full mt-2">
                <p className="text-sm text-gray-500">{truncate(publication.state, maxLength)}</p>
                <div className="text-sm text-blue-500 hover:text-blue-700">
                    <Link to={`/profile/${publication.ownerId}`}>
                        {truncate(publication.owner.name, maxLength)}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;