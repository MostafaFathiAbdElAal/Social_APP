"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMemo } from "react"
import { signUp } from "@/actions/signup.action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
export type PasswordValue = string | undefined;


export type SignupFormValues = {
    name: string
    email: string
    password: string
    rePassword: string
    dateOfBirth: string
    gender: string
}

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export default function FormSignup() {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 120 }, (_, i) => currentYear - i)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            surname: "",
            email: "",
            password: "",
            rePassword: "",
            gender: "male",
            day: "1",
            month: "Jan",
            year: String(currentYear - 21),
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            surname: Yup.string().required("Surname is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
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
            rePassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Please confirm your password")
            ,
            gender: Yup.string().required("Gender is required"),
            day: Yup.string().required("Day is required"),
            month: Yup.string().required("Month is required"),
            year: Yup.string().required("Year is required"),
        }),
        onSubmit: async (values) => {
            const dob = `${values.day.padStart(2, "0")}/${String(
                months.indexOf(values.month) + 1
            ).padStart(2, "0")}/${values.year}`

            const finalValues: SignupFormValues = {
                name: `${values.firstName} ${values.surname}`,
                email: values.email,
                password: values.password,
                rePassword: values.rePassword,
                dateOfBirth: dob,
                gender: values.gender.toLowerCase(),
            }
            await signUp(finalValues).then((res) => {
                if (res.error === 'user already exists.') {
                    formik.setErrors({ email: res.error })
                } else if (res.message === "success") {
                    toast.success("Account created", { duration: 1000 })
                    setTimeout(() => {
                        router.push("/login")
                    }, 1000)
                } else if (res.error) {
                    toast.error(`${res.error}`, { removeDelay: 1000 })
                }

            })

        },
    })

    const daysInMonth = useMemo(() => {
        const monthIndex = months.indexOf(formik.values.month)
        const year = parseInt(formik.values.year)

        if (monthIndex === 1) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28
        }
        if ([3, 5, 8, 10].includes(monthIndex)) return 30
        return 31
    }, [formik.values.month, formik.values.year])

    return (
        <div className="bg-white rounded-md mt-6 shadow-lg  max-w-md mx-auto ">
            <header className="p-6">
                <h2 className="text-2xl font-bold text-center mb-1">
                    Create a new account
                </h2>
                <p className="text-center text-gray-600">Its quick and easy.</p>

            </header>

            <form onSubmit={formik.handleSubmit} className="space-y-4 p-6 border-t-2 border-Lineborder border-dashed">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <TextField
                            type="text"
                            name="firstName"

                            label="First name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full`}
                            error={formik.touched.firstName && formik.errors.firstName ? true : false}
                            helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ""}

                        />

                    </div>
                    <div className="flex-1">
                        <TextField
                            type="text"
                            name="surname"
                            label="Surname"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full`}
                            error={formik.touched.surname && formik.errors.surname ? true : false}
                            helperText={formik.touched.surname && formik.errors.surname ? formik.errors.surname : ""}

                        />

                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Date of birth
                    </label>
                    <div className="flex gap-2 *:h-12 *:cursor-pointer">
                        <select
                            name="day"
                            value={formik.values.day}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`flex-1 border rounded-md px-2 py-2 ${formik.touched.day && formik.errors.day
                                ? "border-red-500 focus:border-gray-300"
                                : "border-gray-300"
                                }`}
                        >
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>

                        <select
                            name="month"
                            value={formik.values.month}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`flex-1 border rounded-md px-2 py-2 ${formik.touched.month && formik.errors.month
                                ? "border-red-500 focus:border-gray-300"
                                : "border-gray-300"
                                }`}
                        >
                            {months.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <select
                            name="year"
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`flex-1 border rounded-md px-2 py-2 ${formik.touched.year && formik.errors.year
                                ? "border-red-500 focus:border-gray-300"
                                : "border-gray-300"
                                }`}
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Gender</label>
                    <div className="flex gap-3">


                        
                            <RadioGroup
                                row
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                className="flex gap-2 w-full"
                            >
                                {["Female", "Male"].map((g) => (
                                    <FormControlLabel
                                        key={g}
                                        value={g.toLowerCase()}
                                        control={<Radio color="success"/>}
                                        label={g}
                                        labelPlacement="start"
                                        className="grow border border-gray-300 rounded-md px-2 py-1"
                                        sx={{ justifyContent: "space-between", margin: 0 }}
                                    />
                                ))}
                            </RadioGroup>
                            
                    </div>
                </div>
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
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
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
                        autoComplete="new-password"
                        className={`w-full`}
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}

                    />

                </div>

                <div>
                    <TextField
                        type="password"
                        name="rePassword"
                        label="Confirm password"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="new-password"
                        className={`w-full`}
                        error={formik.touched.rePassword && formik.errors.rePassword ? true : false}
                        helperText={formik.touched.rePassword && formik.errors.rePassword ? formik.errors.rePassword : ""}

                    />

                </div>

                <div className="font-sans">
                    <article className="mb-4 *:text-[11px] font-medium *:text-[#777] space-y-3">
                        <p className="*:text-LinkColor">People who use our service may have uploaded your contact information to SocialAPP. <Link href={"/"}>Learn more.</Link></p>
                        <p className="*:text-LinkColor">By clicking Sign Up, you agree to our <Link href={"/"}>Terms</Link>, <Link href={"/"}>Privacy Policy</Link> and <Link href={"/"}>Cookies Policy</Link>. You may receive SMS notifications from us and can opt out at any time.</p>
                    </article>
                    <Button loading={formik.isSubmitting} type="submit" variant="contained" loadingPosition="end" sx={{ textAlign: "center", marginInline: "auto", display: "flex", paddingInline: "40px", fontSize: "16px" }} color="success">
                        Sign Up
                    </Button>

                </div>
                <Link href={"/login"} className="text-LinkColor text-lg font-medium text-center block">Already have an account?</Link>
            </form>
        </div>
    )
}
