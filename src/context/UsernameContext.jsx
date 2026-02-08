import { createContext, useEffect, useContext, useState } from "react";

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        const saved = localStorage.getItem('username');
        return saved ? JSON.parse(saved) : '';
    });

    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(username));
    }, [username]);

    const value = {
        username,
        setUsername,
    };

    return (
        <UsernameContext.Provider value={value}>
            {children}
        </UsernameContext.Provider>
    )
};

export const useUsername = () => {
    const context = useContext(UsernameContext);
    if (!context) {
        throw new Error('useUsername must be used within a UsernameProvider');
    }
    return context;
};