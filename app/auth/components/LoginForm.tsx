import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import Image from "next/image"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { z } from "zod"
import { ChangeEvent, useState } from "react"

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [formData, setFormData] = useState<z.infer<typeof Login>>({
    email: "",
    password: "",
    selectedImageNumber: 1,
    superPassword: "",
  })
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            const user = await loginMutation(formData)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              alert("Sorry, those credentials are invalid")
            } else {
              alert("Sorry, we had an unexpected error. Please try again. - " + error.toString())
            }
          }
        }}
      >
        {/* email */}
        <div className="form-group">
          <div>
            <label htmlFor="email">{`Email`}</label>
          </div>
          <div>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, email: e.target.value })
              }}
            />
          </div>
        </div>
        {/* password */}
        <div className="form-group">
          <div>
            <label htmlFor="password">{`Password`}</label>
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, password: e.target.value })
              }}
            />
          </div>
        </div>
        {/* superPassword */}
        <div className="form-group">
          <div>
            <label htmlFor="superPassword">{`Enter super password`}</label>
          </div>
          <div>
            <input
              type="superPassword"
              className="form-control"
              id="superPassword"
              placeholder="Enter super password"
              value={formData.superPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, superPassword: e.target.value })
              }}
            />
          </div>
        </div>
        <div>
          <label>
            {`Select an image`}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr",
                gridGap: "1rem",
              }}
              className="radio-button"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, selectedImageNumber: Number(e.target.value) })
              }}
            >
              {items.map((item, key) => (
                // 3x3 grid
                <div key={key}>
                  <label>
                    <input type="radio" value={item} name="selected-image-number" /> {item}
                    <Image src={`/captcha/${item}.jpeg`} width="100px" height="100px" alt="" />
                  </label>
                </div>
              ))}
            </div>
          </label>
        </div>
        {/* submit button */}
        <div className="form-group">
          <div>
            <button type="submit" className="btn btn-primary">
              {`Submit`}
            </button>
          </div>
        </div>
      </form>

      <div style={{ marginTop: "1rem" }}>
        Or{" "}
        <Link href={Routes.SignupPage()}>
          <a>Sign Up</a>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm

// {
/* <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <LabeledTextField
          name="superPassword"
          label="Super Password"
          placeholder="Enter super key"
          type="text"
        />
        <LabeledTextField
          type="number"
          name="selectedImageNumber"
          label="Select Image ID"
          placeholder="image id"
          min={1}
          max={9}
        />

        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </div>
      </Form> */
// }
