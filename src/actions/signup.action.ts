"use server"

import { SignupFormValues } from "@/components/FormSignup/FormSignup";
export async function signUp(data: SignupFormValues) {
    let res;
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const req = await fetch(
            `${process.env.APIBASEURL}/users/signup`,
            options
        );
        res = await req.json();
        return res
    } catch (error) {
        console.log(error);
    }
} 