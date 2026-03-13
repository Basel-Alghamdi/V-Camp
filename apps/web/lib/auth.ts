import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "op_token";

export interface JwtPayload {
  userId: string;
  role: string;
  buildingId: string | null;
  exp: number;
  iat: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  unitNumber?: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  // Also set as cookie for middleware access
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded = decodeToken(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getUserFromToken(): User | null {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = decodeToken(token);
    if (decoded.exp * 1000 <= Date.now()) return null;
    // JWT only contains userId/role/buildingId — full user info
    // is stored in the auth store by login/register pages.
    // On refresh, return a minimal user so the app stays authenticated;
    // pages that need full user data should call GET /auth/me.
    const stored = localStorage.getItem("op_user");
    if (stored) {
      return JSON.parse(stored) as User;
    }
    return {
      id: decoded.userId,
      email: "",
      name: "",
      role: decoded.role,
    };
  } catch {
    return null;
  }
}
