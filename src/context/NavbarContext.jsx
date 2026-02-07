import { createContext, useContext, useState } from 'react'

const NavbarContext = createContext();
export const NavbarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </NavbarContext.Provider>
    )
};

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
};
