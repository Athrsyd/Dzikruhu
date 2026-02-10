import { createContext, useContext, useState, useEffect } from 'react'

const NavbarContext = createContext();
export const NavbarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [pathBefore, setPathBefore] = useState(() => {
        const saved = localStorage.getItem('pathBefore');
        return saved ? JSON.parse(saved) : null;
    });
    const [page, setPage] = useState(() => {
        return localStorage.getItem('currentPage') || 'home';
    });

    useEffect(() => {
        localStorage.setItem('pathBefore', JSON.stringify(pathBefore));
    }, [pathBefore]);

    useEffect(() => {
        localStorage.setItem('currentPage', page);
    }, [page]);

    const value = { isOpen, setIsOpen, pathBefore, setPathBefore, page, setPage };
    return (
        <NavbarContext.Provider value={value}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
};
