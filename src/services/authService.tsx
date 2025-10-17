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

export async function uploadDocument(file: File) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/uploadfile/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    let msg = "Error al subir el documento";
    try {
      const data = await res.json();
      if (data && typeof data === "object" && "detail" in data) {
        msg = (data as { detail?: string }).detail || msg;
      }
    } catch {}
    throw new Error(msg);
  }

  return await res.json();
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  id_department: number;
}

export async function registerUser(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = "Error al registrar usuario";
    try {
      const data = await res.json();
      if (data && typeof data === "object" && "detail" in data) {
        detail = (data as { detail?: string }).detail || detail;
      }
    } catch {}
    throw new Error(detail);
  }

  return await res.json();
}

export interface Department {
  id: number;
  name: string;
}

export async function getDepartments(): Promise<Department[]> {
  const explicit = (import.meta.env as any).VITE_DEPARTMENTS_URL as string | undefined;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const candidates = (
    explicit ? [explicit] : [
      `${API_BASE}/departments/departments`,
      `${API_BASE}/departments/departments/`,
      `${API_BASE}/departments`,
      `${API_BASE}/departments/`,
      `${API_BASE}/Departments`,
      `${API_BASE}/Departments/`,
      `${API_BASE}/department`,
      `${API_BASE}/department/`,
      `${API_BASE}/Department`,
      `${API_BASE}/Department/`,
      `${API_BASE}/departaments`,
      `${API_BASE}/departaments/`,
      `${API_BASE}/Departaments`,
      `${API_BASE}/Departaments/`,
    ]
  );

  let lastError: Error | null = null;
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
          const errData = await res.json();
          if (errData && typeof errData === "object" && "detail" in errData) {
            detail = (errData as { detail?: string }).detail || detail;
          }
        } catch {}
        lastError = new Error(detail);
        continue;
      }
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : (data?.items ?? data?.results ?? data?.data ?? []);
      const normalized: Department[] = list.map((d: any) => ({
        id: d.id ?? d.id_department ?? d.department_id ?? d.value,
        name: d.name ?? d.name_department ?? d.nombre ?? d.department ?? d.department_name ?? d.label,
      })).filter((d: Department) => (typeof d.id === "number" || /^[0-9]+$/.test(String(d.id))) && !!d.name)
        .map((d: any) => ({ id: Number(d.id), name: d.name }));
      if (normalized.length) return normalized;
      // If empty array returned, continue trying next candidate
      continue;
    } catch (e: any) {
      lastError = e as Error;
      continue;
    }
  }
  if (lastError) throw lastError;
  throw new Error("No se pudo resolver el endpoint de departamentos");
}

