import React, { useEffect, useState, useCallback } from "react";
import PublicationCard from "./publicationCard";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

interface Owner {
    name: string;
}

export interface Publication {
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

const PublicationsGrid: React.FC = () => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [search, setSearch] = useState(localStorage.getItem("search") || "");
    const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);

    const fetchPublications = useCallback(async () => {
        try {
            const response = await axios.get("/publications/");
            const { data }: { data: Publication[] } = response;
            setPublications(data);
            setFilteredPublications(data);
        } catch (error) {
            console.error("Error fetching publications:", error);
        }
    }, []);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

    useEffect(() => {
        const results = publications.filter(publication =>
            publication.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPublications(results);
        localStorage.setItem("search", search);
    }, [search, publications]);

    return (
        <>
            <Navbar />
            <div className="flex-col justify-center items-center pt-32 h-screen">
                <div className="flex justify-center">
                    <div className="relative w-96">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name..."
                            className="w-full p-3 pl-10 mb-4 border-2 border-gray-300 rounded-md text-lg"
                        />
                        <svg className="absolute left-3 top-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center p-4">
                    {filteredPublications.map((publication: Publication) => (
                        <Link to={`/publications/${publication.id}`} key={publication.id} className="m-2">
                            <PublicationCard publication={publication} />
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicationsGrid;
