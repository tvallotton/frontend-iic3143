import { createContext, useEffect, useState } from "react";
import type { User } from "../user/MyAccount";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext({
    token: "",
    login: (_email: string, _password: string) => {},
    logout: () => {},
    user: null as User | null,
});

const protectedRoutesKeywords = ["publish", "update", "me", "profile"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState(localStorage["token"] || "");
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchUser = async  () => {
        const r = await axios.get("/user/me");
        if (r.status === 200) {
            setUser(r.data.user);
        } else {
            logout();
        }
    };

    const login = async (email: string, password: string) => {
        const r = await axios.post("/user/login", { email, password });
        if (r.status == 200) {
            localStorage["token"] = r.data["authorization"];
            setToken(r.data["authorization"]);
            navigate("/");
        } else {
            alert(r.data.message);
        }
    };

    const logout = () => {
        delete localStorage["token"];
        axios.defaults.headers.common.Authorization = "";
        setToken("");
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            fetchUser();
        }
    }, [token]);

    useEffect(() => {
        const includesProtected = protectedRoutesKeywords.some((keyword) => location.pathname.includes(keyword));
        if (!token && includesProtected) {
            navigate("/login");
        } else if (token && ["/login", "/signup"].includes(location.pathname)) {
            navigate("/");
        }
    }, [token, location.pathname]);

    return (
        <AuthContext.Provider value={{ token, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
