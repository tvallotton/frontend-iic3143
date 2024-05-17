import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ButtonComponent from "../common/Button";

interface Publication {
    title: string;
    author: string;
    language: string;
    genre: string;
    state: string;
    description: string;
    type: string;
    price: number;
    image: string;
    booksOfInterest: string[];
    bookId: string;
    owner: string;
    ownerId: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PublicationDescription: React.FC = () => {
    const [publication, setPublication] = useState<Publication | null>(null);
    const {publicationId} = useParams();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/publications/` + publicationId)
            .then((response) => {
                setPublication(response.data);
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
            <div className="min-h-screen flex flex-col md:flex-row justify-center font-body mx-4 md:mx-12">
                <div className="w-full md:w-3/4 mt-24 md:m-6">
                    <img
                        src={publication.image}
                        alt={publication.title}
                        className="h-3/4 object-cover mx-auto rounded-lg"
                        style={{ aspectRatio: "3 / 4" }}
                    />
                </div>
                <div className="w-full md:w-1/2 p-6 mt-12 md:mt-0 grid grid-cols-1 gap-8">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold font-title text-main-blue">
                            {publication.title}
                        </h2>
                        <p className="text-sm text-gray-400">
                        Publicado por: <Link className="hover:text-main-blue hover:underline" to={`/profile/${publication.ownerId}`}>{publication.owner}</Link>
                        </p>
                        <div className="mt-2">
                            {publication.price > 0 && (
                                <p className="text-center md:text-left text-4xl">
                                    ${publication.price.toLocaleString("es-ES", { minimumFractionDigits: 0 })}
                                </p>
                            )}
                            <p className="text-left mt-2 text-gray-600">
                                <span className="font-bold">Autor@:</span> {publication.author}
                            </p>
                            <p className="text-left mt-2 text-gray-600">
                                <span className="font-bold">Idioma:</span> {publication.language}
                            </p>
                            <p className="text-left mt-2 text-gray-600">
                                <span className="font-bold">Género:</span> {publication.genre}
                            </p>
                            <p className="text-left mt-2 text-gray-600">
                                <span className="font-bold">Estado:</span> {publication.state}
                            </p>
                            <p className="text-left mt-2 text-gray-600">
                                <span className="font-bold">Tipo:</span> {publication.type}
                            </p>
                            <p className="text-left mt-2 text-gray-600">
                                <a className="hover:text-main-blue hover:underline" href={`https://books.google.cl/books?id=${publication.bookId}`} target="_blank" rel="noopener noreferrer">
                                    Ver libro en Google Books
                                </a>
                            </p>
                            {publication.booksOfInterest.map((book, index) => (
                                <p key={index} className="text-left mt-2 text-gray-600">
                                    <span className="font-bold">{book}</span>
                                </p>
                            ))}
                            <div className="text-left mt-6 text-gray-600 overflow-y-auto max-h-64" dangerouslySetInnerHTML={{ __html: publication.description.replace(/\n/g, "<br />") }} />
                        </div>
                    </div>
                    <ButtonComponent text="Contactar vendedor" onClick={() => console.log("Comprando...")} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicationDescription;