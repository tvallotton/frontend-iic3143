import React, { useEffect, useState, useCallback } from "react";
import PublicationCard from "./publicationCard";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { type PublicationFromBackend } from "./types";
import LanguageFilter from "./components/filters/languageFilter";
import GenreFilter from "./components/filters/genreFilter";
import { GenresProvider } from "./components/context/genresContext";
import BookStateFilter from "./components/filters/bookStateFilter";
import ButtonComponent from "../common/Button";
import TypeFilter from "./components/filters/typeFilter";
import SearchFilter from "./components/filters/SearchFilter";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusIcon, PlusIcon} from "@heroicons/react/20/solid";


const filters = [
    {
        id: "language",
        name: "Language",
        spanishName: "Idioma",
        component: LanguageFilter,
    },
    {
        id: "genre",
        name: "Genre",
        spanishName: "Género",
        component: GenreFilter,
    },
    {
        id: "bookState",
        name: "Book State",
        spanishName: "Estado del libro",
        component: BookStateFilter,
    },
    {
        id: "type",
        name: "Type",
        spanishName: "Tipo",
        component: TypeFilter,
    },
];


const PublicationsGrid: React.FC = () => {
    const [publications, setPublications] = useState<PublicationFromBackend[]>([]);
    const [filteredPublications, setFilteredPublications] = useState<PublicationFromBackend[]>([]);
    const [searchTitle, setSearchTitle] = useState(localStorage.getItem("searchTitle") || "");
    const [searchAuthor, setSearchAuthor] = useState(localStorage.getItem("searchAuthor") || "");
    const [languageFilter, setLanguageFilter] = useState(localStorage.getItem("languageFilter") || "");
    const [genreFilter, setGenreFilter] = useState(localStorage.getItem("genreFilter") || "");
    const [bookStateFilter, setBookStateFilter] = useState(localStorage.getItem("bookStateFilter") || "");
    const [typeFilter, setTypeFilter] = useState(localStorage.getItem("typeFilter") || "");

    const fetchPublications = useCallback(async () => {
        try {
            const response = await axios.get("/publications/");
            const { data }: { data: PublicationFromBackend[] } = response;
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
        localStorage.setItem("languageFilter", languageFilter);
        localStorage.setItem("genreFilter", genreFilter);
        localStorage.setItem("bookStateFilter", bookStateFilter);
        localStorage.setItem("typeFilter", typeFilter);
        localStorage.setItem("searchTitle", searchTitle);
        localStorage.setItem("searchAuthor", searchAuthor);
    }, [languageFilter, genreFilter, bookStateFilter, typeFilter, searchTitle, searchAuthor]);

    useEffect(() => {
        let results = publications;
        if (searchTitle) {
            results = publications.filter((publication) =>
                publication.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }
        if (searchAuthor) {
            results = publications.filter((publication) =>
                publication.author.toLowerCase().includes(searchAuthor.toLowerCase())
            );
        }
        if (languageFilter) {
            results = results.filter((publication) => publication.language === languageFilter);
        }
        if (genreFilter) {
            results = results.filter((publication) => publication.genres.includes(genreFilter));
        }
        if (bookStateFilter) {
            results = results.filter((publication) => publication.bookState === bookStateFilter);
        }
        if (typeFilter) {
            results = results.filter((publication) => publication.type.includes(typeFilter));
        }
        setFilteredPublications(results);
    }, [searchTitle, searchAuthor, languageFilter, genreFilter, bookStateFilter, typeFilter, publications]);

    return (
        <GenresProvider>
            <div className="bg-white">
                <Navbar />
                <div className="pt-7">
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Publicaciones</h1>
                            <div className="flex items-center">
                                <SearchFilter
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    placeholder="Buscar por título..."
                                />
                                <SearchFilter
                                    value={searchAuthor}
                                    onChange={(e) => setSearchAuthor(e.target.value)}
                                    placeholder="Buscar por autor..."
                                />
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <div className="hidden lg:block">
                                    <ButtonComponent
                                        text="Reiniciar Filtros"
                                        onClick={() => {
                                            setLanguageFilter("");
                                            setGenreFilter("");
                                            setBookStateFilter("");
                                            setTypeFilter("");
                                        }}
                                    />

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6" defaultOpen>
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.spanishName}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-4">
                                                            {React.createElement(section.component, {
                                                                value: eval(`${section.id}Filter`),
                                                                setValue: eval(`set${section.name.replace(/\s/g, "")}Filter`)
                                                            })}
                                                        </div>
                                                    </DisclosurePanel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>

                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    <div className="flex flex-wrap justify-center p-4">
                                        {filteredPublications.map((publication: PublicationFromBackend) => (
                                            <Link to={`/publications/${publication.id}`} key={publication.id} className="m-2">
                                                <PublicationCard publication={publication} />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
                <Footer />
            </div>
        </GenresProvider>
    );
};

export default PublicationsGrid;
