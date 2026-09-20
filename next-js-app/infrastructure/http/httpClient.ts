/**
 * Infrastructure Layer: Base HTTP Client
 * Ready for future Spring Boot API integrations (e.g., http://localhost:8080/api/v1).
 */

export interface HttpResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(endpoint: string, body?: unknown, headers?: HeadersInit): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown, headers?: HeadersInit): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<HttpResponse<T>> {
    const url = this.baseUrl ? `${this.baseUrl}${endpoint}` : endpoint;
    const response = await fetch(url, options);
    let data: T;
    try {
      data = (await response.json()) as T;
    } catch {
      data = {} as T;
    }
    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  }
}

export const defaultHttpClient = new HttpClient();
