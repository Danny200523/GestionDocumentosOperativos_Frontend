import { Navigate, Outlet, useLocation } from "react-router-dom";

interface JwtPayload {
  exp?: number;
  role?: string;
  roles?: string[];
  [key: string]: unknown;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isAllowed(payload: JwtPayload | null, allowedRoles?: string[]) {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!payload) return false;
  const role = payload.role;
  const roles = payload.roles;
  if (role && allowedRoles.includes(role)) return true;
  if (Array.isArray(roles) && roles.some(r => allowedRoles.includes(r))) return true;
  return false;
}

export function PrivateRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const location = useLocation();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  const payload = decodeJwt(token);
  const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : false;

  if (isExpired) {
    try { localStorage.removeItem("token"); } catch {}
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!isAllowed(payload, allowedRoles)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}