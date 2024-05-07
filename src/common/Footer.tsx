import pagePalsLogo from "../assets/pagePals-white.png";

export default function Footer() {
    return (
        <footer className="bg-main-blue text-white flex justify-center items-center py-4">
            <div className="flex flex items-center">
                <img src={pagePalsLogo} alt="PagePals logo" className="w-20 h-auto mb-2 mr-6" />
                <div>
                    <p>Hecho con amor para todos los lectores 🤍. </p>
                    <p>&copy; {new Date().getFullYear()} PagePals. Todos los derechos reservados.</p>
                </div>
                
            </div>
        </footer>
    );
}