import { createContext, useContext, useState, useEffect } from 'react';

const LatinContext = createContext();

export const LatinProvider = ({ children }) => {
  const [isLatin, setIsLatin] = useState(() => {
    const saved = localStorage.getItem('isLatin');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLatin', JSON.stringify(isLatin));
  }, [isLatin]);

  const value = {
    isLatin,
    setIsLatin,
  };

  return (
    <LatinContext.Provider value={value}>
      {children}
    </LatinContext.Provider>
  );
};

export const useLatin = () => {
  const context = useContext(LatinContext);
  if (!context) {
    throw new Error('useLatin must be used within a LatinProvider');
  }
  return context;
};
