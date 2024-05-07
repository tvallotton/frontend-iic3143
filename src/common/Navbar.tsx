import pagePalsLogo from "../assets/pagePals.png";
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <nav className="bg-white font-body">
            <div className="w-full">
                <div className="flex justify-between">
                    <Link to={'/'}>
                        <img src={pagePalsLogo} className="sm:h-24 w-auto h-12" alt="PagePals logo" />
                    </Link>
                    <div>
                        <a href="/explore" className="py-5 px-3 text-gray-700 hover:text-gray-900">Explorar</a>
                        <a href="/find" className="py-5 px-3 text-gray-700 hover:text-gray-900">Buscar</a>
                        <a href="/publish" className="py-5 px-3 text-gray-700 hover:text-gray-900">Publicar</a>
                        <a href="/login" className="py-5 px-3 text-gray-700 hover:text-gray-900">Iniciar sesión</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}