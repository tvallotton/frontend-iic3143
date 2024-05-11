import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

interface Publication {
    title: string;
    image: string;
    price: number;
    author: string;
    description: string;
}



const PublicationDescription: React.FC = () => {
    const [publication, setPublication] = useState<Publication | null>(null);
    const {publicationId} = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/publications/" + publicationId)
            .then((response) => {
                setPublication(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [publicationId]);

    if (!publication) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col md:flex-row justify-center font-body font-normal">
                <div className="w-full md:w-1/2 mt-24 m-6 md:m-24">
                    <img src={publication.image} alt={publication.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-6 mt-12 md:mt-0 grid grid-cols-1 gap-4">
                    <div>
                        <h2 className="mt-6 text-4xl font-extrabold font-title">
                            {publication.title}
                        </h2>
                        <div className="mt-6">
                            <p className="text-left text-8xl">
                        ${publication.price.toLocaleString("es-ES", { minimumFractionDigits: 0 })}
                            </p>
                            <p className="text-left mt-12">
                                <span className="font-bold">Autor@:</span> {publication.author}
                            </p>
                            <div className="text-left mt-6" dangerouslySetInnerHTML={{ __html: publication.description.replace(/\n/g, "<br />") }} />
                        </div>
                    </div>
                    <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start w-3/4 md:w-full">
                CONTACTAR VENDEDOR
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicationDescription;