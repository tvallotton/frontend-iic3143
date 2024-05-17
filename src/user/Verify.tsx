
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import axios from "axios";
import { useEffect } from "react";


export default function Verify() {

    const navigate = useNavigate();
    const [params, _] = useSearchParams();
    const token = params.get("token");


    const submit = async () => {
        const r = await axios.post("/user/verify", { token });
        if (r.status == 200) {
            navigate("/verified");
        } else {
            alert(r.data.message);
        }
    };

    useEffect(() => { submit(); }, [token]);


    return (
        <div className="mt-10">
            <div className="flex justify-center">
                <h1 className="font-bold text-xl">Verificando correo electrónico</h1>
            </div>
            <div className="flex justify-center mt-2">

                <span className="loader" />

            </div>
        </div>
    );
}
