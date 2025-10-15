const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

/**
 * Inicia sesión y obtiene el token JWT.
 */
export async function login({ email, password }: { email: string; password: string }) {
  const params = new URLSearchParams();
  params.append("username", email); // FastAPI usa 'username' en OAuth2PasswordRequestForm
  params.append("password", password);

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    let detail = "Error al iniciar sesión";
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (data && typeof data === "object" && "detail" in data) {
      const d = data as { detail?: string };
      detail = d.detail || detail;
    }
    throw new Error(detail);
  }

  return await res.json(); // Devuelve { access_token, token_type }
}

/**
 * Obtiene los datos del usuario actual a partir del token guardado.
 */
export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible");

  const res = await fetch(`${API_BASE}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Error al obtener información del usuario");
  }

  return await res.json();
}
