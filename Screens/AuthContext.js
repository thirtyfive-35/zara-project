import React, { createContext, useContext, useState } from 'react';

// AuthContext oluşturma
export const AuthContext = createContext();

// AuthProvider bileşeni oluşturma
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Oturum açma fonksiyonu
    const signIn = (newToken) => {
        setToken(newToken);
    };

    // Oturum kapatma fonksiyonu
    const signOut = () => {
        setToken(null);
    };

    // Context değerlerini döndürme
    return (
        <AuthContext.Provider value={{ token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook oluşturma
export const useAuth = () => {
    return useContext(AuthContext);
};
