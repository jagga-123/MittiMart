export const AUTH_STORAGE_KEY = 'mittimart-auth';

const base64 = (value) => {
  try {
    return window.btoa(unescape(encodeURIComponent(value)));
  } catch {
    return value;
  }
};

export const createMockToken = (payload) => {
  const header = base64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64(JSON.stringify({
    ...payload,
    issuedAt: new Date().toISOString(),
  }));
  const signature = base64(`${payload.id}:${payload.role}`);
  return `${header}.${body}.${signature}`;
};

export const readAuthSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const writeAuthSession = (session) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

