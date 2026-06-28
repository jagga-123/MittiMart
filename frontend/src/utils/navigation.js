import { getRoleHomePath, ROLES } from '../permissions/permissions';

const routeMap = {
  home: '/',
  products: '/products',
  about: '/about',
  contact: '/contact',
  login: '/login',
  register: '/register',
  auth: '/login',
  cart: '/cart',
  wishlist: '/wishlist',
  checkout: '/checkout',
  orders: '/orders',
  profile: '/profile',
  chat: '/chat',
  notifications: '/notifications',
  tracking: '/tracking',
  seller: '/seller/dashboard',
  admin: '/admin/dashboard',
  sellerDashboard: '/seller/dashboard',
  adminDashboard: '/admin/dashboard',
};

export const resolveAppPath = (target, options = {}) => {
  if (!target) {
    return '/';
  }

  if (target.startsWith('product/')) {
    return `/product/${target.split('/')[1]}`;
  }

  if (target.startsWith('artist/')) {
    return `/artist/${target.split('/')[1]}`;
  }

  if (target.startsWith('seller/edit-product/')) {
    return `/seller/edit-product/${target.split('/').slice(2).join('/')}`;
  }

  if (target === 'auth') {
    if (options.defaultTab === 'seller' || options.mode === 'register') {
      return '/register?role=seller';
    }

    if (options.defaultTab === 'admin') {
      return '/register?role=admin';
    }

    return '/login';
  }

  if (target === 'home' && options.section === 'products') {
    return '/products';
  }

  if (target === 'home' && options.search) {
    return '/';
  }

  if (target === 'seller' && options.section) {
    return `/seller/${options.section}`;
  }

  if (target === 'admin' && options.section) {
    return `/admin/${options.section}`;
  }

  return routeMap[target] || `/${String(target).replace(/^\//, '')}`;
};

export const toAppNavigate = (navigate) => (target, options) => {
  navigate(resolveAppPath(target, options));
};

export const getHomePathForRole = (role) => {
  return getRoleHomePath(role || ROLES.GUEST);
};

