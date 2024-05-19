import { useState } from "react";
import Landing from "./landing/Landing";
import "./App.css";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage["token"]}`;


function App() {
    const [count, setCount] = useState(0);

    return <Landing />;
}

export default App;
