import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearAuthSession, createMockToken, readAuthSession, writeAuthSession } from '../auth/authStorage';
import { ROLES, ROLE_LABELS, getRoleHomePath, hasPermission, PERMISSIONS } from '../permissions/permissions';

const AuthContext = createContext(null);

const demoProfiles = {
  [ROLES.CUSTOMER]: {
    name: 'Aarav Customer',
    email: 'customer@mittimart.test',
    language: 'en',
  },
  [ROLES.SELLER]: {
    name: 'Sunita Devi',
    email: 'seller@mittimart.test',
    language: 'hi-IN',
  },
  [ROLES.ADMIN]: {
    name: 'MittiMart Admin',
    email: 'admin@mittimart.test',
    language: 'en',
  },
};

const getDefaultProfile = (role, formValues = {}) => ({
  id: formValues.id || `user-${Date.now()}`,
  name: formValues.name || demoProfiles[role]?.name || 'Guest User',
  email: formValues.email || demoProfiles[role]?.email || 'guest@mittimart.test',
  role,
  token: createMockToken({
    id: formValues.id || `user-${Date.now()}`,
    role,
    email: formValues.email || demoProfiles[role]?.email || 'guest@mittimart.test',
  }),
  language: formValues.language || demoProfiles[role]?.language || 'en',
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('mittimart-lang') || 'en');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const session = readAuthSession();
    if (session?.user) {
      setUser(session.user);
      setLanguage(session.user.language || 'en');
    }
    setIsAuthReady(true);
  }, []);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    if (user) {
      writeAuthSession({ user });
      if (user.language) {
        localStorage.setItem('mittimart-lang', user.language);
      }
    } else {
      clearAuthSession();
    }
  }, [isAuthReady, user]);

  useEffect(() => {
    localStorage.setItem('mittimart-lang', language);
  }, [language]);

  const login = (payload) => {
    const role = payload?.role || ROLES.CUSTOMER;
    const nextUser = getDefaultProfile(role, payload);
    setUser(nextUser);
    setLanguage(nextUser.language || 'en');
    return nextUser;
  };

  const loginBuyer = (email, name) => login({ email, name: name || 'Customer', role: ROLES.CUSTOMER });
  const loginSeller = (sellerData) => login({ ...sellerData, role: ROLES.SELLER });
  const loginAdmin = (adminData) => login({ ...adminData, role: ROLES.ADMIN });

  const logout = () => {
    setUser(null);
    setLanguage('en');
    clearAuthSession();
  };

  const role = user?.role || ROLES.GUEST;
  const isAuthenticated = !!user;

  const value = useMemo(() => ({
    user,
    role,
    isAuthenticated,
    isAuthReady,
    language,
    setLanguage,
    login,
    loginBuyer,
    loginSeller,
    loginAdmin,
    logout,
    getRoleHomePath,
    hasPermission,
    canViewProducts: hasPermission(role, PERMISSIONS.VIEW_PRODUCTS),
    canAddProduct: hasPermission(role, PERMISSIONS.ADD_PRODUCT),
    canEditProduct: hasPermission(role, PERMISSIONS.EDIT_PRODUCT),
    canDeleteProduct: hasPermission(role, PERMISSIONS.DELETE_PRODUCT),
    canManageUsers: hasPermission(role, PERMISSIONS.MANAGE_USERS),
    canCheckout: hasPermission(role, PERMISSIONS.CHECKOUT),
    canViewAnalytics: hasPermission(role, PERMISSIONS.VIEW_ANALYTICS),
    isSeller: role === ROLES.SELLER,
    isBuyer: role === ROLES.CUSTOMER,
    isAdmin: role === ROLES.ADMIN,
    roleLabel: ROLE_LABELS[role] || ROLE_LABELS[ROLES.GUEST],
  }), [language, role, user, isAuthReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

