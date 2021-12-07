import { object, string } from "yup"

export const authRegisterSchema = object({
    body: object({
        email: string().email("Must be a valid email.").max(128).required("Email is required."),
        first_name: string().max(64).required("First name is required."),
        last_name: string().max(64).required("Last name is required."),
        password: string()
            .required("Password is required")
            /*.matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Invalid password. Must be at least 8 characters long and include uppercase letters and digits."
            )*/
    })
})

export const authLoginSchema = object({
    body: object({
        email: string().email("Must be a valid email.").max(128).required("Email is required."),
        password: string()
            .required("Password is required")
            /*.matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Password can only contains Latin letters."
            )*/
    })
})
