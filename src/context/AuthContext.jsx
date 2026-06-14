import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mittimart-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('mittimart-lang') || 'en';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mittimart-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mittimart-user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mittimart-lang', language);
  }, [language]);

  const loginBuyer = (email) => {
    const newUser = { email, type: 'buyer', name: email.split('@')[0] };
    setUser(newUser);
    setLanguage('en');
  };

  const loginSeller = (sellerData) => {
    const newUser = {
      ...sellerData,
      type: 'seller',
    };
    setUser(newUser);
    if (sellerData.language) {
      setLanguage(sellerData.language);
    }
  };

  const logout = () => {
    setUser(null);
    setLanguage('en');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        language,
        setLanguage,
        loginBuyer,
        loginSeller,
        logout,
        isSeller: user?.type === 'seller',
        isBuyer: user?.type === 'buyer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
