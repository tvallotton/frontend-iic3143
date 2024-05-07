import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    let navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return (
        <>
            <Navbar/>
            <div className="min-h-screen flex justify-center font-body font-normal">
                <div className="w-1/2">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold font-title">
                            ¡Inicia sesión en PagePals!
                        </h2>
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
                            <div className="mb-4">
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
                        <p className="mb-8 text-left">¿Olvidaste tu contraseña? Haz <Link to='/forgot-password' className="underline text-main-blue font-medium">click aquí</Link></p>
                        <div>
                            <button type='submit' className='mb-2 w-full justify-center py-2 px-4 rounded-md text-white bg-main-blue hover:bg-dark-blue'>
                            Iniciar sesión
                            </button>
                        </div>
                        <div>
                            <button onClick={() => navigate("/signup")} className='w-full justify-center py-2 px-4 rounded-md text-black bg-white border border-black hover:bg-gray-100'>
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
