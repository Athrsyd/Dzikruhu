import { createContext, useContext, useState, useEffect } from 'react';
const FontContext = createContext();

export const FontProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('fontSize');
        return saved ? JSON.parse(saved) : 'Small';
    });

    useEffect(() => {
        localStorage.setItem('fontSize', JSON.stringify(fontSize));
    }, [fontSize]);
    const value = {
        fontSize,
        setFontSize,
    };  
    return (
        <FontContext.Provider value={value}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};