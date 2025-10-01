"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { login } from "@/actions/login.action";
import { useRouter } from "next/navigation";
import { getDataUser } from "@/store/features/user.slice";
import { useAppDispatch } from "@/hooks/Redux.hook";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required")
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            "Password must contain at least one uppercase letter, one number, and one special character"
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
        onSubmit: (values) => {
            login(values).then((res) => {
                if (res === "success") {
                    dispatch(getDataUser())
                    router.push("/")

                    
                }
            })
        }
        ,
        validationSchema
    })

    return <>
        <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl shadow-md p-6 w-full max-w-md space-y-3">
            <div>


                <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Email address or phone number"
                    className={`w-full border border-solid ${formik.dirty && formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"}  rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/20 focus:border-[#1877f2] font-semibold text-base`}
                />
                {
                    formik.dirty && formik.touched.email && formik.errors.email ? <p className="px-2 font-sans font-medium text-sm text-red-500">{formik.errors.email}</p> : ""
                }
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className={`w-full border border-solid ${formik.dirty && formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/20 focus:border-[#1877f2] font-semibold text-base`}
                />
                {
                    formik.dirty && formik.touched.password && formik.errors.password ? <p className="px-2 font-sans font-medium text-sm text-red-500">{formik.errors.password}</p> : ""
                }
            </div>

            <button type="submit" className="w-full bg-[#1877f2] transition-colors duration-300 text-white font-semibold py-3 rounded-md hover:bg-[#166fe5]">
                Log in
            </button>

            <hr className="my-4 border border-dashed border-gray-300" />

            <Link href={"/signup"} className="px-10 w-fit block mx-auto bg-[#42b72a] transition-colors duration-300 text-white font-semibold py-3 rounded-md hover:bg-[#36a420] text-center">
                Create new account
            </Link>
        </form>
    </>
};
