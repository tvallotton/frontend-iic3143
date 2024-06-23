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
import type { PublicationFormParams, PublicationFormErrors } from "./types";
import { useNavigate } from "react-router-dom";

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
    const [errors, setErrors] = useState<PublicationFormErrors>({});
    const [posted, setPosted] = useState(false);
    const [searchByISBN, setSearchByISBN] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    const searchParamDebounced = useDebouncedValue(searchParam, 1000);
    const [books, setBooks] = useState <Book[]> ([]);
    const [showPopUp, setShowPopup] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [canEditAuthor, setCanEditAuthor] = useState(false);
    const navigate = useNavigate();

    const modalBooks = useMemo(() => books.map((book: Book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        image: book.volumeInfo.imageLinks?.smallThumbnail || "",
        author: book.volumeInfo.authors?.[0] || "",
    })), [books]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post("/publications", formData);
            if (response.status === 201){
                setPosted(true);
                const publicationId = response.data.id;
                setTimeout(() => navigate("/publications/" + publicationId), 3000);
            }
        } catch (error) {
            console.error("Error creating publication:", error);
        }
    };

    const validateForm = () => {
        const errors: PublicationFormErrors = {};
        if (!formData.title) {
            errors.title = "Busca un libro para completar este campo";
        }
        if (!formData.author) {
            errors.author = "Busca un libro para completar este campo";
        }
        if (!formData.language) {
            errors.language = "El idioma es requerido";
        }
        if (!formData.type) {
            errors.type = "El tipo de publicación es requerido";
        }
        if (formData.type === "Venta" || formData.type === "Venta/Permuta") {
            if (!formData.price) {
                errors.price = "El precio debe ser mayor a cero";
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
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
        return ("### INTERCAMBIO POR ###" + "\n\n### DESCRIPCIÓN ###\n\n" + (description || "Descripción no encontrada") + "\n\n### COMENTARIOS ADICIONALES ###");
    };

    const onSelectBook = (bookId: string) => {
        const book = books.find((book) => book.id === bookId);
        if (book) {
            setFormData((previous) => ({
                ...previous,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors?.[0] || "",
                description: formatDescription(book.volumeInfo.description),
                bookId: book.id,
                genres: book.volumeInfo.categories || ["N/A"],
                language: book.volumeInfo.language,
                image: book.volumeInfo.imageLinks?.thumbnail || "",
            }));
            setCanEditAuthor(book.volumeInfo.authors?.[0] === "");
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
                <div className="flex items-center justify-center p-12 pt-48 font-body">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <h2 className="font-title text-4xl font-bold text-center">¡Publica tu libro en PagePals!</h2>
                        <label className="mb-3 my-6 block text-base font-medium text-[#07074D]">
                            Busca tu libro
                        </label>
                        <div className="space-y-2 mb-5">
                            <div>
                                <input onFocus={() => setShowPopup(searchParam !== "")} onBlur={() => setShowPopup(false)} type="text" name="searchBook" id="searchBook" placeholder={searchByISBN ? "ISBN" : "Título"}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={({target}) => {setLoadingSearch(searchParam !== ""); setSearchParam(target.value);}} value={searchParam}/>
                                <BookOptions books={modalBooks} visible={showPopUp} onSelectBook={onSelectBook} loadingSearch={loadingSearch}/>
                            </div>
                            <div className="flex items-center">
                                <input checked={searchByISBN} onChange={() => setSearchByISBN(previous => !previous)} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="ms-2 text-sm text-gray-900 dark:text-gray-300">Buscar por ISBN</label>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <FormTextInput label="Título" value={formData.title} onChange={handleChange} error={errors.title}
                                placeholder="Quijote" type="text" name="title" id="title" disabled/>

                            <FormTextInput label="Autor" value={formData.author} onChange={handleChange} error={errors.author}
                                placeholder="Cervantes" type="text" name="author" id="author" disabled={!canEditAuthor} />

                            <FormTextInput label="Descripción" value={formData.description} onChange={handleChange}
                                placeholder="Historia de un hidalgo manchego..." type="text" name="description" id="description"/>

                            <FormTextInput disabled label="Géneros" value={formData.genres.join(", ")} onChange={handleChange}
                                placeholder="Acción, Aventura, etc" type="text" name="genres" id="genres"/>

                            <FormTextInput label="Idioma" value={formData.language} onChange={handleChange}
                                placeholder="Español" type="text" name="language" id="language"/>

                            <TypeDropdown label="Estado" value={formData.bookState} onChange={handleChange}
                                options={["Nuevo", "Como Nuevo", "Usado", "Muy Usado"]} name="bookState" id="bookState"/>

                            <TypeDropdown label="Tipo" value={formData.type} onChange={handleChange}
                                options={["Permuta", "Venta/Permuta", "Venta"]} name="type" id="type"/>

                            {(formData.type === "Venta" || formData.type === "Venta/Permuta")? (
                                <FormTextInput label="Precio" value={formData.price} onChange={handleChange}
                                    placeholder="$" type="number" name="price" id="price" error={errors.price} />) : null}
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
