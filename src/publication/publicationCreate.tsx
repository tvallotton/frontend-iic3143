import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "axios";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", formData);
        try {
            await axios.post("http://localhost:8080/publications", formData);
            setPosted(true);
        } catch (error) {
            console.error("Error creating publication:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" ? parseInt(value) : value,
        });
    };

    const autocompleteData = () => {
        if (!formData.title) {
            return;
        }
        axios.get("http://localhost:8080/publications/autocomplete")
            .then((response) => {
                setFormData({
                    ...formData,
                    author: response.data.author,
                    description: response.data.description,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                Título
                                </label>
                                <input type="text" name="title" id="title" placeholder="Quijote"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" 
                                    onChange={handleChange} value={formData.title}/>
                                <button 
                                    type="button" onClick={autocompleteData} className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start w-full">Autocompletar
                                </button>
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
