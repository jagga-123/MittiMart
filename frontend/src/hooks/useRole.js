import { useAuth } from './useAuth';

export const useRole = () => {
  const { user, role, isAuthenticated } = useAuth();

  return {
    user,
    role,
    isAuthenticated,
    isGuest: role === 'guest',
    isCustomer: role === 'customer',
    isSeller: role === 'seller',
    isAdmin: role === 'admin',
  };
};

