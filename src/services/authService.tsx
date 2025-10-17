const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export interface DocumentItem {
  id: number;
  filename: string;
  date: string;
  status: string;
}

export async function login({ email, password }: { email: string; password: string }) {
  const params = new URLSearchParams();
  params.append("username", email);
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

  return await res.json();
}


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

export async function getDocuments(): Promise<DocumentItem[]> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible");

  const res = await fetch(`${API_BASE}/documents/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    let detail = "Error al cargar los documentos";
    try {
      const data = await res.json();
      if (data && typeof data === "object" && "detail" in data) {
        detail = (data as { detail?: string }).detail || detail;
      }
    } catch {}
    throw new Error(detail);
  }

  return res.json();
}