import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage["token"]}`;


function App() {
    const [count, setCount] = useState(0);

    const token = localStorage["token"];
    const [email, setEmail] = useState("");


    async function fetchUser() {
        const r = await axios.get("/user/me");
        if (r.status == 200) {
            setEmail(r.data.user.email);
        }
    }

    useEffect(() => { fetchUser(); }, [token]);

    return (
        <>
            {email === "" ?
                <p>Not logged in</p> :
                <p>User email: {email}</p>
            }
        </>
    );
}

export default App;
