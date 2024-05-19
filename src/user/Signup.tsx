import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "axios";

export default function Signup() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [birthdate, setBirthdate] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();

    const calculateAge = (birthdate: string) => {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password != confirmPassword) {
            alert("las contraseñas no coinciden");
        }

        // Calculate age
        const age = calculateAge(birthdate);

        // Check if age is less than 18
        if (age < 18) {
            alert("Debes tener al menos 18 años para registrarte.");
            return;
        }

        const r = await axios.post("/user", {
            email,
            password,
            name: firstName,
            lastName
        });

        if (r.status == 201) {
            navigate("/check-your-email");
        }
        else {
            alert(r.data.message);
        }
    };

    const validateBirthdate = (birthdate: string) => {
        const age = calculateAge(birthdate);

        if (age < 18) {
            setValidationMessage("Debes tener al menos 18 años para registrarte.");
        } else {
            setValidationMessage("");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center font-body font-normal pt-32 mb-2">
                <div className="w-1/2">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold font-title">
                            ¡Crea una cuenta en PagePals!
                        </h2>
                        <p className="mt-2 text-center text-lg font-body text-gray-500">
                            Y comienza a explorar junto a nuestra comunidad lectora
                        </p>
                    </div>
                    <form className='mt-8' onSubmit={handleSubmit}>
                        <input type='hidden' name='remember' defaultValue='true' />
                        <div className='rounded-md'>
                            <div className="mb-6">
                                <p className="text-left">
                                    Correo electrónico
                                </p>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded focus:outline-none focus:border-dark-blue sm:text-sm'
                                    placeholder='ejemplo@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='rounded-md'>
                            <div className="mb-6">
                                <p className="text-left">
                                    Nombre
                                </p>
                                <input
                                    id='firstName'
                                    name='firstName'
                                    type='firstName'
                                    autoComplete='firstName'
                                    required
                                    className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded focus:outline-none focus:border-dark-blue sm:text-sm'
                                    placeholder='Juan'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='rounded-md'>
                            <div className="mb-6">
                                <p className="text-left">
                                    Apellido
                                </p>
                                <input
                                    id='lastName'
                                    name='lastName'
                                    type='lastName'
                                    autoComplete='lastName'
                                    required
                                    className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded focus:outline-none focus:border-dark-blue sm:text-sm'
                                    placeholder='Perez'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='rounded-md'>
                            <div className="mb-6">
                                <p className="text-left">
                                    Contraseña
                                </p>
                                <input
                                    id='pasword'
                                    name='password'
                                    type='password'
                                    autoComplete='password'
                                    required
                                    className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded focus:outline-none focus:border-dark-blue sm:text-sm'
                                    placeholder='**********'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='rounded-md'>
                            <div className="mb-8">
                                <p className="text-left">
                                    Confirmar contraseña
                                </p>
                                <input
                                    id='pasword'
                                    name='password'
                                    type='password'
                                    autoComplete='password'
                                    required
                                    className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded focus:outline-none focus:border-dark-blue sm:text-sm'
                                    placeholder='**********'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='rounded-md'>
                            <div className="mb-6">
                                <p className="text-left">
                                    Fecha de nacimiento
                                </p>
                                <input
                                    id='birthdate'
                                    name='birthdate'
                                    type='date'
                                    required
                                    className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded focus:outline-none focus:border-dark-blue sm:text-sm'
                                    value={birthdate}
                                    onChange={(e) => {
                                        setBirthdate(e.target.value);
                                        validateBirthdate(e.target.value);
                                    }}
                                />
                                <p className="text-red-500">{validationMessage}</p>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='mb-2 w-full justify-center py-2 px-4 rounded-md text-white bg-main-blue hover:bg-dark-blue'>
                                Crear cuenta
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/login")} className='w-full justify-center py-2 px-4 rounded-md text-black bg-white border border-black hover:bg-gray-100'>
                                ¡Ya tengo una cuenta!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
