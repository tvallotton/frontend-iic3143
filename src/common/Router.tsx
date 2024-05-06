import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../user/Login";
import Signup from "../user/Signup";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
