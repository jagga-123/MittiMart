import { useAuth } from './useAuth';
import {
  PERMISSIONS,
  canAddProduct,
  canCheckout,
  canDeleteProduct,
  canEditProduct,
  canManageUsers,
  canViewAnalytics,
  canViewProducts,
  hasPermission,
} from '../permissions/permissions';

export const usePermission = () => {
  const { role } = useAuth();

  return {
    hasPermission: (permission) => hasPermission(role, permission),
    canViewProducts: () => canViewProducts(role),
    canAddProduct: () => canAddProduct(role),
    canEditProduct: () => canEditProduct(role),
    canDeleteProduct: () => canDeleteProduct(role),
    canManageUsers: () => canManageUsers(role),
    canCheckout: () => canCheckout(role),
    canViewAnalytics: () => canViewAnalytics(role),
    permissions: PERMISSIONS,
  };
};

