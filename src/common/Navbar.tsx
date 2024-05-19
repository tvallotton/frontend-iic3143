import { useEffect, useState } from "react";
import pagePalsLogo from "../assets/pagePals.png";
import { Link } from "react-router-dom";
import axios from "axios";



export default function Navbar() {
    const token = localStorage["token"];
    const [email, setEmail] = useState("");


    async function fetchUser() {
        const r = await axios.get("/user/me");
        if (r.status == 200) {
            setEmail(r.data.user?.email || "");
        }
    }

    useEffect(() => { fetchUser(); }, [token, email]);


    return (
        <nav className="bg-white font-body px-12 fixed w-screen h-28">
            <div className="w-full flex-row justify-end">
                <div className="flex justify-between items-center">
                    <Link to={"/"}>
                        <img src={pagePalsLogo} className="mt-3 sm:h-24 w-auto h-12" alt="PagePals logo" />
                    </Link>
                    <div>
                        <a href="/explore" className="py-5 px-3 text-gray-700 hover:text-gray-900">Explorar</a>
                        <a href="/find" className="py-5 px-3 text-gray-700 hover:text-gray-900">Buscar</a>
                        <a href="/publish" className="py-5 px-3 text-gray-700 hover:text-gray-900">Publicar</a>
                        <a href="/login" className="py-5 px-3 text-gray-700 hover:text-gray-900">{!email ? "Iniciar Sesión" : "Cerrar Sesión"}</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
