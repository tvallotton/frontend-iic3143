import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../user/Login";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
