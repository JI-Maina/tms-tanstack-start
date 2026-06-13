import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { useAppSession } from '#/lib/session'
import type { LoginSchema } from '#/lib/schemas'

export const loginFn = createServerFn({ method: 'POST' })
  .validator((data: LoginSchema) => data)
  .handler(async ({ data }) => {
    const url = process.env.API_URL
    if (!url) {
      throw new Error('API_URL is not set')
    }

    const res = await fetch(`${url}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email_or_phone_number: data.phone,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(`Login Failed: ${error.detail || 'Failed to login'}`)
    }

    const user = await res.json()

    const session = await useAppSession()
    await session.update({
      accessToken: user.access_token,
      refreshToken: user.refresh_token,
      user: {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        phone: user.phone_number,
      },
    })

    return { success: true }
  })

// get access token
export const getAccessTokenFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    return session.data.accessToken
  },
)

// get user
export const getUserFn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()

  if (!session.data.user) {
    throw redirect({ to: '/login' })
  }

  return session.data.user
})
