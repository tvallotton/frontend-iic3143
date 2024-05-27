import { useCallback, useEffect, useMemo, useState } from "react";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import libraryImage from "../assets/libreria.avif";
import genreImage from "../assets/genre.png";
import Carousel from "./components/Carousel";
import type { CarouselItem } from "./components/Carousel";
import type { PublicationFromBackend } from "../publication/types";

import axios from "axios";
import { Link } from "react-router-dom";

const genres = [
    {
        title: "Ciencia Ficción",
        description: "Explora mundos futuristas y tecnológicos",
        image: genreImage,
        link: "#"
    },
    {
        title: "Fantasía",
        description: "Sumérgete en mundos mágicos y fantásticos",
        image: genreImage,
        link: "#"
    },
    {
        title: "Terror",
        description: "Vive experiencias aterradoras",
        image: genreImage,
        link: "#"
    },
    {
        title: "Romance",
        description: "Vive historias de amor y pasión",
        image: genreImage,
        link: "#"
    },
    {
        title: "Misterio",
        description: "Descubre secretos y resuelve misterios",
        image: genreImage,
        link: "#"
    },
] satisfies CarouselItem[];


export default function Landing() {
    const [publications, setPublications] = useState<PublicationFromBackend[]>([]);
    const carouselPublicationItems = useMemo(() => publications.map((publication) => ({
        title: publication.title,
        description: publication.author,
        image: publication.image,
        link: `/publications/${publication.id}`
    })), [publications]);

    const fetchPublications = useCallback(async () => {
        try {
            const response = await axios.get("/publications/");
            const { data }: { data: PublicationFromBackend[]; } = response;
            setPublications(data.slice(0, 5));
        } catch (error) {
            console.error("Error fetching publications:", error);
        }
    }, []);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);


    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center pt-48 flex-1 font-body">
                <div className="flex-col justify-center items-center w-1/2">
                    <div>
                    <div className="text-center">
                        <h1 className="text-5xl font-bold font-title">¡Únete a la comunidad de PagePals!</h1>
                        <p className="text-2xl mt-4">Comparte, intercambie y vende libros por internet</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to="/find">
                            <button className="bg-main-blue hover:bg-dark-blue text-white rounded-lg py-2 px-8 mt-8 text-lg">Buscar ahora</button>
                        </Link>
                    </div>
                    <div className="flex justify-center mt-4">
                        <img src={libraryImage} className="h-auto mt-8 rounded-md" alt="Librería" />
                    </div>
                    </div>
                    <div className="mt-16">
                        <Carousel title="Géneros populares" description="Explora los géneros más populares" items={genres} viewAllLink="#" />
                    </div>
                    <div className="mt-8">
                        <Carousel title="Publicaciones recientes" description="Descubre las últimas publicaciones" items={carouselPublicationItems} viewAllLink="/find" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
