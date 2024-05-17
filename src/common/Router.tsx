import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../user/Login";
import Signup from "../user/Signup";
import Verify from "../user/Verify";
import Verified from "../user/Verified";
import CheckYourEmail from "../user/CheckYourEmail";
import PublicationDescription from "../publication/publicationDescription";
import PublicationsGrid from "../publication/publicationsGrid";
import PublicationCreate from "../publication/publicationCreate";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/verify"} element={<Verify />} />
                <Route path={"/verified"} element={<Verified />} />
                <Route path={"/check-your-email"} element={<CheckYourEmail />} />
                <Route path={"/publications/:publicationId"} element={<PublicationDescription />} />
                <Route path={"/find"} element={<PublicationsGrid />} />
                <Route path={"/publish"} element={<PublicationCreate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
