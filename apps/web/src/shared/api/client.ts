const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

export class ApiClientError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init, headers: { Accept: 'application/json', ...init.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new ApiClientError(response.status, body?.message ?? 'Không thể kết nối máy chủ.');
  }
  return response.json() as Promise<T>;
}
