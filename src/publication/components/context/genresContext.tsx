import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";

const GenresContext = createContext<string[]>([]);



export const GenresProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [genres, setGenres] = useState<string[]>([]);

    const fetchGenres = useCallback(async () => {
        try {
            const response = await axios.get("publications/genres");
            setGenres(response.data);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    }, []);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    return (
        <GenresContext.Provider value={genres}>
            {children}
        </GenresContext.Provider>
    );
};

export const useGenres = () => {
    return useContext(GenresContext);
};
