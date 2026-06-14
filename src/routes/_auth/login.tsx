import { z } from 'zod'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import {
  isRedirect,
  useNavigate,
  createFileRoute,
} from '@tanstack/react-router'

import { loginFn } from '#/data/auth'
import { loginSchema } from '#/lib/schemas'
import { safeInternalPath } from '#/lib/utils'
import { Button } from '#/components/ui/button'
import { InputField } from '#/components/general/forms/input-field'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '#/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from '#/components/ui/field'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { redirect } = Route.useSearch()
  const redirectTo = safeInternalPath(redirect)

  const form = useForm({
    validators: {
      onSubmit: loginSchema,
      onBlur: loginSchema,
    },
    defaultValues: {
      phone: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)

      try {
        await loginFn({ data: value })
        await navigate({ to: redirectTo, replace: true })
      } catch (error) {
        if (isRedirect(error)) throw error

        const message =
          error instanceof Error ? error.message : 'An unknown error occurred'
        setSubmitError(message)
        console.error(error)
      }
    },
  })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="phone"
              children={(field) => (
                <InputField
                  field={field}
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+254712345678"
                  autoComplete="tel"
                />
              )}
            />

            <form.Field
              name="password"
              children={(field) => (
                <InputField
                  field={field}
                  id="password"
                  label="Password"
                  type="password"
                  labelEnd={
                    <a
                      href="#"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  }
                />
              )}
            />

            {submitError ? (
              <Field>
                <FieldError errors={[{ message: submitError }]} />
              </Field>
            ) : null}

            <Field>
              <form.Subscribe
                selector={(state) => [state.isSubmitting, state.canSubmit]}
                children={([isSubmitting, canSubmit]) => (
                  <Button disabled={isSubmitting || !canSubmit} type="submit">
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Login'
                    )}
                  </Button>
                )}
              />
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
