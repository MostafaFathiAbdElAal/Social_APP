"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { login } from "@/actions/login.action";
import { useRouter } from "next/navigation";
import { getDataUser } from "@/store/features/user.slice";
import { useAppDispatch } from "@/hooks/Redux.hook";
import toast from "react-hot-toast";
import { PasswordValue } from "../FormSignup/FormSignup";
import { Button, TextField } from "@mui/material";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters long")
        .required("Password is required")

        .test(
            'hasUpperCase',
            'Must contain at least one uppercase letter',
            (val: PasswordValue) => {
                if (!val) return false;
                return /[A-Z]/.test(val);
            }
        )
        .test(
            'hasLowerCase',
            'Must contain at least one lowercase letter',
            (val: PasswordValue) => val ? /[a-z]/.test(val) : false
        )
        .test(
            'hasNumber',
            'Must contain at least one number',
            (val: PasswordValue) => val ? /[0-9]/.test(val) : false
        )
        .test(
            'hasSpecialChar',
            'Must contain at least one special character',
            (val: PasswordValue) => val ? /[#?!@$%^&*-]/.test(val) : false
        ),
})
export default function FormLogin() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            await login(values).then((res) => {
                if (res === "success") {
                    toast.success("Login succeeded", { duration: 1000 })
                    dispatch(getDataUser())
                    
                    
                    setTimeout(() => {
                        router.push("/")
                    }, 1000)
                } else {
                    formik.setErrors({
                        password: `${res.error}`,
                        email: `${res.error}`
                    })
                }
            })
        }
        ,
        validationSchema
    })

    return <>
        <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl shadow-md p-6 w-full max-w-md space-y-3">
            <div>


                <TextField
                    type="email"
                    name="email"
                    label="Email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="email"
                    className={`w-full`}
                    error={formik.touched.email && formik.errors.email ? true : false}
                />
            </div>

            <div>
                <TextField
                    type="password"
                    name="password"
                    label="New password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="password"
                    className={`w-full`}
                    error={formik.touched.password && formik.errors.password ? true : false}
                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}

                />
            </div>

            <Button loading={formik.isSubmitting} type="submit" variant="contained" loadingPosition="end" color="primary" sx={{ textAlign: "center", marginInline: "auto", display: "flex", paddingInline: "40px", fontSize: "16px" }}>
                Log in
            </Button>

            <hr className="my-4 border border-dashed border-gray-300" />

            <Link href={"/signup"} className="px-10 w-fit block mx-auto bg-[#42b72a] transition-colors duration-300 text-white font-semibold py-3 rounded-md hover:bg-[#36a420] text-center">
                Create new account
            </Link>
        </form>
    </>
};
