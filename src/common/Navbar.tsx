import pagePalsLogo from "../assets/pagePals.png";
import { Link } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

export default function Navbar() {
    const { token, logout } = useAuth();

    return (
        <nav className="bg-white font-body px-12 fixed w-screen h-28 z-10 border border-1">
            <div className="w-full flex-row justify-end">
                <div className="flex justify-between items-center">
                    <Link to={"/"}>
                        <img
                            src={pagePalsLogo}
                            className="mt-3 sm:h-24 w-auto h-12"
                            alt="PagePals logo"
                        />
                    </Link>
                    <div>
                        <Link
                            to="/find"
                            className="py-5 px-3 text-gray-700 hover:text-gray-900"
                        >
              Explorar
                        </Link>
                        {token && (
                            <Link
                                to="/publish"
                                className="py-5 px-3 text-gray-700 hover:text-gray-900"
                            >
                Publicar
                            </Link>
                        )}
                        <Link
                            to={token ? "" : "/login"}
                            onClick={token ? logout : () => {}}
                            className="py-5 px-3 text-gray-700 hover:text-gray-900"
                        >
                            {!token ? "Iniciar sesión" : "Cerrar sesión"}
                        </Link>
                        {token && (
                            <Link
                                to="/me"
                                className="py-5 px-3 text-gray-700 hover:text-gray-900"
                            >
                Mi cuenta
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
