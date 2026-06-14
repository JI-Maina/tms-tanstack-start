import { useAppSession } from './session'

// Prevent multiple refresh requests at the same time
let refreshPromise: Promise<string> | null = null

// Function to refresh the access token
// Returns a promise that resolves to the new access token
async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const session = await useAppSession()
    const refreshToken = session.data.refreshToken

    if (!refreshToken) {
      throw new Error('No refresh token found')
    }

    const url = process.env.API_URL
    if (!url) {
      throw new Error('API_URL is not set')
    }

    const res = await fetch(`${url}/auth/refresh-token`, {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(
        `Failed to refresh access token: ${error.detail || 'Failed to refresh access token'}`,
      )
    }

    const data = await res.json()

    await session.update({
      ...session.data,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })

    return data.access_token as string
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  retried = false,
): Promise<Response> {
  const session = await useAppSession()
  const accessToken = session.data.accessToken

  if (!accessToken) {
    throw new Error('No access token found')
  }

  const url = process.env.API_URL
  if (!url) {
    throw new Error('API_URL is not set')
  }

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }

  const res = await fetch(`${url}${path}`, {
    ...options,
    headers,
  })

  if (res.status === 401 && !retried) {
    await refreshAccessToken()
    return apiFetch(path, options, true)
  }

  return res
}

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(
      error.detail || error.message || `Request failed (${res.status})`,
    )
  }

  if (res.status === 204) {
    return undefined as T
  }

  return res.json() as Promise<T>
}

export const apiService = {
  async get<T>(path: string) {
    return parseResponse<T>(await apiFetch(path, { method: 'GET' }))
  },

  async post<T>(path: string, data?: unknown) {
    return parseResponse<T>(
      await apiFetch(path, { method: 'POST', body: JSON.stringify(data) }),
    )
  },

  async put<T>(path: string, data?: unknown) {
    return parseResponse<T>(
      await apiFetch(path, { method: 'PUT', body: JSON.stringify(data) }),
    )
  },

  async patch<T>(path: string, data?: unknown) {
    return parseResponse<T>(
      await apiFetch(path, { method: 'PATCH', body: JSON.stringify(data) }),
    )
  },

  async delete<T>(path: string) {
    return parseResponse<T>(await apiFetch(path, { method: 'DELETE' }))
  },
}
