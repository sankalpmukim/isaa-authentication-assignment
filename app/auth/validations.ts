import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const selectedImageNumber = z.number().min(1).max(9)

export const superPassword = z.string()

export const fullName = z.string().min(3).max(100)

export const Signup = z.object({
  email,
  password,
  selectedImageNumber,
  superPassword,
  fullName,
})

export const Login = z.object({
  email,
  password: z.string(),
  selectedImageNumber,
  superPassword,
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
    superPassword,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
  superPassword,
})
