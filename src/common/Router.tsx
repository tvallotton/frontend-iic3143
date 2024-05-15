import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../user/Login";
import Signup from "../user/Signup";
import PublicationDescription from "../publication/publicationDescription";
import PublicationCreate from "../publication/publicationCreate";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/publications/:publicationId"} element={<PublicationDescription />} />
                <Route path={"/publications/create"} element={<PublicationCreate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
