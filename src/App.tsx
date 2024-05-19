import Landing from "./landing/Landing";
import "./App.css";
import axios from "axios";


axios.defaults.baseURL = import.meta.env.VITE_BACK_URL;
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage["token"]}`;


function App() {
    return <Landing />;
}

export default App;
