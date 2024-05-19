import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "axios";
import BookOptions from "./components/bookOptions";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import type { Book } from "../publication/types";
import FormTextInput from "./components/formTextInput";
import PublishBookButton from "./components/publishBookButton";
import PublishedSuccesfully from "./components/publishedSuccesfully";
import TypeDropdown from "./components/typeDropdown";
import type { PublicationFormParams } from "./types";

const PublicationForm: React.FC = () => {
    const [formData, setFormData] = useState<PublicationFormParams>({
        title: "",
        author: "",
        language: "",
        genres: [],
        bookState: "Nuevo",
        description: "",
        type: "Venta/Permuta",
        price: 0,
        image: "",
        booksOfInterest: "",
        bookId: "",
    });
    const [posted, setPosted] = useState(false);
    const [searchByISBN, setSearchByISBN] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const searchParamDebounced = useDebouncedValue(searchParam, 1000);
    const [books, setBooks] = useState <Book[]> ([]);
    const [showPopUp, setShowPopup] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const modalBooks = useMemo(() => books.map((book: Book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        image: book.volumeInfo.imageLinks?.smallThumbnail || "",
        author: book.volumeInfo.authors?.[0] || "",
    })), [books]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/publications", formData);
            setPosted(true);
        } catch (error) {
            console.error("Error creating publication:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: name === "price" ? parseInt(value) : value,
        }));
    };

    const buscarLibro = async () => {
        const query = searchByISBN ? `isbn:${searchParamDebounced}` : searchParamDebounced;
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {headers: {"authorization": ""}});
            setBooks(response.data.items || []);
            setLoadingSearch(false);
            setShowPopup(true);
        } catch (error) {
            console.error("Error getting autocomplete:", error);
        }
    };

    const formatDescription = (description: string) => {
        return ("### INTERCAMBIO POR ###" + "\n\n### DESCRIPCIÓN ###\n\n" + description + "\n\n### COMENTARIOS ADICIONALES ###");
    };

    const onSelectBook = (bookId: string) => {
        const book = books.find((book) => book.id === bookId);
        if (book) {
            setFormData((previous) => ({
                ...previous,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors[0],
                description: formatDescription(book.volumeInfo.description),
                bookId: book.id,
                genres: book.volumeInfo.categories || "",
                language: book.volumeInfo.language,
                image: book.volumeInfo.imageLinks?.thumbnail || "",
            }));
        }
        setShowPopup(false);
    };

    useEffect(() => {
        if (searchParamDebounced) {
            buscarLibro();
        } else {
            setBooks([]);
            setLoadingSearch(false);
        }
    }
    , [searchParamDebounced]);

    return (
        <>
            <Navbar />
            {posted ? (
                <PublishedSuccesfully />
            ) : (
                <div className="flex items-center justify-center p-12 pt-32">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Busca tu libro
                        </label>
                        <div className="space-y-2 mb-5">
                            <div>
                                <input onFocus={() => setShowPopup(searchParam !== "")} onBlur={() => setShowPopup(false)} type="text" name="searchBook" id="searchBook" placeholder={searchByISBN ? "ISBN" : "Título"}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={({target}) => {setLoadingSearch(searchParam !== ""); setSearchParam(target.value);}} value={searchParam}/>
                                <BookOptions books={modalBooks} visible={showPopUp} onSelectBook={onSelectBook} loadingSearch={loadingSearch}/>
                            </div>
                            <div className="flex items-center">
                                <input checked={searchByISBN} onChange={() => setSearchByISBN(previous => !previous)} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Buscar por ISBN</label>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <FormTextInput label="Título" value={formData.title} onChange={handleChange}
                                placeholder="Quijote" type="text" name="title" id="title" disabled/>

                            <FormTextInput label="Autor" value={formData.author} onChange={handleChange}
                                placeholder="Cervantes" type="text" name="author" id="author" disabled/>

                            <FormTextInput label="Descripción" value={formData.description} onChange={handleChange}
                                placeholder="Historia de un hidalgo manchego..." type="text" name="description" id="description"/>

                            <FormTextInput disabled label="Géneros" value={formData.genres.join(", ")} onChange={handleChange}
                                placeholder="Acción, Aventura, etc" type="text" name="genre" id="genre"/>

                            <FormTextInput label="Idioma" value={formData.language} onChange={handleChange}
                                placeholder="Español" type="text" name="language" id="language"/>

                            <TypeDropdown label="Estado" value={formData.bookState} onChange={handleChange}
                                options={["Nuevo", "Como Nuevo", "Usado", "Muy Usado"]} name="state" id="state"/>

                            <TypeDropdown label="Tipo" value={formData.type} onChange={handleChange}
                                options={["Permuta", "Venta/Permuta", "Venta"]} name="type" id="type"/>

                            {(formData.type === "Venta" || formData.type === "Venta/Permuta")? (
                                <FormTextInput label="Precio" value={formData.price} onChange={handleChange}
                                    placeholder="$" type="number" name="price" id="price"/>) : null}

                            <PublishBookButton />
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default PublicationForm;
