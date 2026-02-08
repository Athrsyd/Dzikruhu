import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const applyThemeToDom = (theme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (!saved) return 'light';
        try {
            return JSON.parse(saved);
        } catch {
            return saved;
        }
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
        applyThemeToDom(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};