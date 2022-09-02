import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { z } from "zod"

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [formData, setFormData] = useState<z.infer<typeof Signup>>({
    email: "",
    fullName: "",
    password: "",
    superPassword: "",
    selectedImageNumber: 1,
  })
  return (
    <div>
      <h1>{`Create an Account`}</h1>
      <h3>{`Three factor authentication`}</h3>
      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault()
            await signupMutation(formData)
            props.onSuccess && props.onSuccess()
          } catch (err: any) {
            alert(`Error creating account`)
            console.error(err)
          }
        }}
      >
        {/* fullName */}
        <div className="form-group">
          <div>
            <label htmlFor="fullName">{`Full Name`}</label>
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFormData({ ...formData, fullName: e.target.value })
              }}
            />
          </div>
        </div>
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
    </div>
  )
}

export default SignupForm
{
  /* <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        {" "}
        <LabeledTextField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        />
        <h4>{`Email and password as the first factor.`}</h4>
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <h4>{`Super (universal) pasword as the second factor.`}</h4>
        <LabeledTextField
          name="superPassword"
          label="Super Password"
          placeholder="Enter super key"
          type="text"
        />
        <h4>{`Select an image as the third factor.`}</h4>
        <LabeledTextField
          type="number"
          name="selectedImageNumber"
          label="Select Image"
          placeholder="image id"
          min={1}
          max={9}
          // value={value}
          // onChange={(e) => {
          //   console.log(Number(e.target.value))
          //   setValue(Number(e.target.value))
          // }}
          // hide
          // style={{ display: "none" }}
        /> */
}
{
  /* <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr",
            gridGap: "1rem",
          }}
          className="radio-button"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(Number(e.target.value))
          }}
        >
          {items.map((item, key) => (
            // 3x3 grid
            <div key={key}>
              <label>
                <input
                  type="radio"
                  defaultChecked={value === item}
                  value={item}
                  name="selected-image-number"
                />{" "}
                {item}
                <Image src={`/captcha/${item}.jpeg`} width="100px" height="100px" alt="" />
              </label>
            </div>
          ))}
        </div> */
}
{
  /* </Form> */
}
