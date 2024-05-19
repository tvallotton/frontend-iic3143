import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "axios";
import FormTextInput from "./components/formTextInput";
import PublishBookButton from "./components/publishBookButton";
import PublishedSuccesfully from "./components/publishedSuccesfully";
import TypeDropdown from "./components/typeDropdown";
import { useParams } from "react-router-dom";

const PublicationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        state: "",
        type: "",
        language: "",
        price: "",
    });
    const [updated, setUpdated] = useState(false);
    const {publicationId} = useParams();

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await axios.get(`/publications/${publicationId}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching publication:", error);
            }
        };

        fetchPublication();
    }, [publicationId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/publications/${publicationId}`, formData);
            setUpdated(true);
        } catch (error) {
            console.error("Error updating publication:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((previous) => ({
            ...previous,
            [name]: name === "price" ? parseInt(value) : value,
        }));
    };

    return (
        <>
            <Navbar />
            {updated ? (
                <PublishedSuccesfully />
            ) : (
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form onSubmit={handleSubmit}>
                            <FormTextInput label="Título" value={formData.title} onChange={() => {}} placeholder="" type="text" name="title" id="title"/>
                            <FormTextInput label="Autor" value={formData.author} onChange={() => {}} placeholder="" type="text" name="author" id="author"/>
                            <FormTextInput label="Género" value={formData.genre} onChange={() => {}} placeholder="" type="text" name="genre" id="genre"/>

                            <FormTextInput label="Descripción" value={formData.description} onChange={handleChange}
                                placeholder="Historia de un hidalgo manchego..." type="text" name="description" id="description"/>

                            <TypeDropdown label="Estado" value={formData.state} onChange={handleChange}
                                options={["Nuevo", "Como Nuevo", "Usado", "Muy Usado"]} name="state" id="state"/>

                            <TypeDropdown label="Tipo" value={formData.type} onChange={handleChange}
                                options={["Permuta", "Venta/Permuta", "Venta"]} name="type" id="type"/>

                            <FormTextInput label="Idioma" value={formData.language} onChange={handleChange}
                                placeholder="Español" type="text" name="language" id="language"/>

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