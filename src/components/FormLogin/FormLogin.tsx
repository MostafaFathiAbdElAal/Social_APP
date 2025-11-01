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
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { ContactMail, Visibility, VisibilityOff } from "@mui/icons-material";
import { useRef, useState } from "react";
import { areEqual } from "@/utils/Obj.utils";

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
    const [showPassword, setShowPassword] = useState(false);
    const prvValues = useRef({
        email: "",
        password: ""
    })
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        initialStatus: "",
        onSubmit: async (values) => {
            /* 
            Vaildate values is 
            
            */
            if (areEqual(prvValues.current, formik.values)) return;
            prvValues.current = formik.values
            await login(values).then((res) => {
                if (res === "success") {
                    toast.success("Login succeeded", { duration: 1000 })
                    dispatch(getDataUser())
                    formik.resetForm()
                    setTimeout(() => {
                        router.push("/")
                    }, 1000)
                } else {
                    formik.setStatus(res.error)
                }
            })
        }
        ,
        validationSchema
    })

    return <>
        <form onSubmit={formik.handleSubmit} className={`bg-white rounded-xl shadow-md p-4 sm:p-6 w-full max-w-md space-y-3 ${formik.isSubmitting ? "cursor-progress" : ""}`}>
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
                    error={(formik.dirty || formik.submitCount !== 0) && formik.touched.email && formik.errors.email ? true : false}
                    helperText={(formik.dirty || formik.submitCount !== 0) && formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ContactMail />
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <div>
                <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="New password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="new-password"
                    error={(formik.dirty || formik.submitCount !== 0) && formik.touched.password && Boolean(formik.errors.password)}
                    helperText={(formik.dirty || formik.submitCount !== 0) && formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

            </div>
            {
                !formik.isSubmitting && areEqual(prvValues.current, formik.values) && formik.status ? <p className="text-red-500 text-sm font-medium ps-2">{formik.status}</p> : null
            }
            <Button loading={formik.isSubmitting} type="submit" variant="contained" loadingPosition="end" color="primary" sx={{ textAlign: "center", marginInline: "auto", display: "flex", paddingInline: "40px", fontSize: "16px" }}>
                Log in
            </Button>

            <hr className="my-4 border border-dashed border-gray-300" />

            <Button LinkComponent={Link} href="/signup" color="success" variant="contained" sx={{ textAlign: "center", marginInline: "auto", display: "flex", paddingInline: "10px", fontSize: "16px" }}>
                Create new account
            </Button>
        </form>
    </>
};
