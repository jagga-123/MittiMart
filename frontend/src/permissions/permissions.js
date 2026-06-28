import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Heart,
  User,
  MessageCircle,
  PlusCircle,
  PencilLine,
  BarChart3,
  Users,
  ShieldCheck,
  FileText,
  Settings,
  Store,
  Boxes,
  ClipboardList,
  Megaphone,
  Home,
  Info,
  Contact,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const ROLES = Object.freeze({
  GUEST: 'guest',
  CUSTOMER: 'customer',
  SELLER: 'seller',
  ADMIN: 'admin',
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.GUEST]: 'Guest',
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.SELLER]: 'Seller',
  [ROLES.ADMIN]: 'Admin',
});

export const ROLE_HOME_PATH = Object.freeze({
  [ROLES.GUEST]: '/',
  [ROLES.CUSTOMER]: '/',
  [ROLES.SELLER]: '/seller/dashboard',
  [ROLES.ADMIN]: '/admin/dashboard',
});

export const PUBLIC_NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Products', path: '/products', icon: Boxes },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Contact', path: '/contact', icon: Contact },
];

export const NAV_ITEMS = Object.freeze({
  [ROLES.GUEST]: [
    ...PUBLIC_NAV_ITEMS,
  ],
  [ROLES.CUSTOMER]: [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Orders', path: '/orders', icon: ClipboardList },
    { label: 'Wishlist', path: '/wishlist', icon: Heart },
    { label: 'Cart', path: '/cart', icon: ShoppingCart },
  ],
  [ROLES.SELLER]: [
    { label: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/seller/products', icon: Package },
    { label: 'Orders', path: '/seller/orders', icon: ClipboardList },
    { label: 'Messages', path: '/seller/messages', icon: MessageCircle },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Reports', path: '/admin/reports', icon: FileText },
  ],
});

export const SIDEBAR_ITEMS = Object.freeze({
  [ROLES.SELLER]: [
    { label: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
    { label: 'Add Product', path: '/seller/add-product', icon: PlusCircle },
    { label: 'Edit Product', path: '/seller/edit-product/madhubani-painting-lord-ganesha', icon: PencilLine },
    { label: 'My Products', path: '/seller/products', icon: Package },
    { label: 'Orders', path: '/seller/orders', icon: ClipboardList },
    { label: 'Messages', path: '/seller/messages', icon: MessageCircle },
    { label: 'Analytics', path: '/seller/analytics', icon: BarChart3 },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Users', path: '/admin/users', icon: Users },
    { label: 'Manage Sellers', path: '/admin/sellers', icon: Store },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ClipboardList },
    { label: 'Reports', path: '/admin/reports', icon: Megaphone },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ],
});

export const PERMISSIONS = Object.freeze({
  VIEW_PRODUCTS: 'view_products',
  ADD_PRODUCT: 'add_product',
  EDIT_PRODUCT: 'edit_product',
  DELETE_PRODUCT: 'delete_product',
  MANAGE_USERS: 'manage_users',
  MANAGE_SELLERS: 'manage_sellers',
  MANAGE_PRODUCTS: 'manage_products',
  CHECKOUT: 'checkout',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_ORDERS: 'view_orders',
  VIEW_MESSAGES: 'view_messages',
  VIEW_REPORTS: 'view_reports',
  MANAGE_SETTINGS: 'manage_settings',
});

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.GUEST]: [PERMISSIONS.VIEW_PRODUCTS],
  [ROLES.CUSTOMER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CHECKOUT,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_MESSAGES,
  ],
  [ROLES.SELLER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.ADD_PRODUCT,
    PERMISSIONS.EDIT_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_MESSAGES,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.ADD_PRODUCT,
    PERMISSIONS.EDIT_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SELLERS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.CHECKOUT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_MESSAGES,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
});

export const ROUTE_ACCESS = Object.freeze({
  '/cart': [ROLES.CUSTOMER],
  '/wishlist': [ROLES.CUSTOMER],
  '/checkout': [ROLES.CUSTOMER],
  '/orders': [ROLES.CUSTOMER],
  '/profile': [ROLES.CUSTOMER],
  '/chat': [ROLES.CUSTOMER],
  '/seller/dashboard': [ROLES.SELLER, ROLES.ADMIN],
  '/seller/add-product': [ROLES.SELLER, ROLES.ADMIN],
  '/seller/edit-product': [ROLES.SELLER, ROLES.ADMIN],
  '/seller/products': [ROLES.SELLER, ROLES.ADMIN],
  '/seller/orders': [ROLES.SELLER, ROLES.ADMIN],
  '/seller/messages': [ROLES.SELLER, ROLES.ADMIN],
  '/seller/analytics': [ROLES.SELLER, ROLES.ADMIN],
  '/admin/dashboard': [ROLES.ADMIN],
  '/admin/users': [ROLES.ADMIN],
  '/admin/sellers': [ROLES.ADMIN],
  '/admin/products': [ROLES.ADMIN],
  '/admin/orders': [ROLES.ADMIN],
  '/admin/reports': [ROLES.ADMIN],
  '/admin/settings': [ROLES.ADMIN],
});

export const hasPermission = (role, permission) => {
  if (role === ROLES.ADMIN) {
    return true;
  }

  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
};

export const canViewProducts = (role) => hasPermission(role, PERMISSIONS.VIEW_PRODUCTS);
export const canAddProduct = (role) => hasPermission(role, PERMISSIONS.ADD_PRODUCT);
export const canEditProduct = (role) => hasPermission(role, PERMISSIONS.EDIT_PRODUCT);
export const canDeleteProduct = (role) => hasPermission(role, PERMISSIONS.DELETE_PRODUCT);
export const canManageUsers = (role) => hasPermission(role, PERMISSIONS.MANAGE_USERS);
export const canCheckout = (role) => hasPermission(role, PERMISSIONS.CHECKOUT);
export const canViewAnalytics = (role) => hasPermission(role, PERMISSIONS.VIEW_ANALYTICS);

export const getRoleLabel = (role) => ROLE_LABELS[role] ?? ROLE_LABELS[ROLES.GUEST];
export const getRoleHomePath = (role) => ROLE_HOME_PATH[role] ?? ROLE_HOME_PATH[ROLES.GUEST];
export const getNavigationItems = (role) => NAV_ITEMS[role] ?? NAV_ITEMS[ROLES.GUEST];
export const getSidebarItems = (role) => SIDEBAR_ITEMS[role] ?? [];
