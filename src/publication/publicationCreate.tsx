import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "axios";
import BookOptions from "./components/bookOptions";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import type { Book } from "../publication/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PublicationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        author: "",
        description: "",
        image: "https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg",
        ownerId: 1,
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
        console.log("Form data:", formData);
        try {
            await axios.post(`${BACKEND_URL}/publications`, formData);
            setPosted(true);
        } catch (error) {
            console.error("Error creating publication:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: name === "price" ? parseInt(value) : value,
        }));
    };

    const buscarLibro = async () => {
        const query = searchByISBN ? `isbn:${searchParamDebounced}` : searchParamDebounced;
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            setBooks(response.data.items);
            setLoadingSearch(false);
            setShowPopup(true);
        } catch (error) {
            console.error("Error getting autocomplete:", error);
        }
    };

    const onSelectBook = (bookId: string) => {
        console.log("Selected book:", bookId);
        const book = books.find((book) => book.id === bookId);
        if (book) {
            setFormData((previous) => ({
                ...previous,
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors[0],
                description: book.volumeInfo.description,
            }));
        }
        setShowPopup(false);
    }

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
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                            <p className="text-lg font-semibold">Publicación Creada con éxito</p>
                            <p>Gracias por publicar tu libro en PagePals</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Busca tu libro
                        </label>
                        <div className="space-y-2">
                            <div>
                                <input onFocus={() => setShowPopup(searchParam !== "")} onBlur={() => setShowPopup(false)} type="text" name="searchBook" id="searchBook" placeholder={searchByISBN ? "ISBN" : "Título"}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                    onChange={({target}) => {setLoadingSearch(searchParam !== ""); setSearchParam(target.value)}} value={searchParam}/>
                                <BookOptions books={modalBooks} visible={showPopUp} onSelectBook={onSelectBook} loadingSearch={loadingSearch}/>
                            </div>
                            <div className="flex items-center">
                                <input checked={searchByISBN} onChange={() => setSearchByISBN(previous => !previous)} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Buscar por ISBN</label>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                Título
                                </label>
                                <input type="text" name="title" id="title" placeholder="Quijote"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                    onChange={handleChange} value={formData.title}/>
                            </div>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                Precio
                                </label>
                                <input type="number" name="price" id="price" placeholder="$"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                    onChange={handleChange} value={formData.price}/>
                            </div>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                Autor
                                </label>
                                <input type="text" name="author" id="author" placeholder="Cervantes"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                    onChange={handleChange} value={formData.author}/>
                            </div>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                Descripción
                                </label>
                                <textarea name="description" id="description" placeholder="Historia de un hidalgo manchego..."
                                    className="w-full h-40 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                    onChange={handleChange} value={formData.description}></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit" className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start w-full">
                Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default PublicationForm;
