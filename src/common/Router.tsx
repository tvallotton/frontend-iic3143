import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../user/Login";
import Signup from "../user/Signup";
import PublicationDescription from "../publication/publicationDescription";
import PublicationsGrid from "../publication/publicationsGrid";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/publications/:publicationId"} element={<PublicationDescription />} />
                <Route path={"/find"} element={<PublicationsGrid />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
