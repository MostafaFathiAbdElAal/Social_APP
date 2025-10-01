"use server"
import { cookies } from "next/headers";
type Values = {
    email: string;
    password: string;
};

export async function login(data: Values) {
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const req = await fetch(
            `${process.env.APIBASEURL}/users/signin`,
            options
        );
        const res = await req.json();
        if (res.message !== "success") return;

        (await cookies()).set("token", res.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/"
        })
    
        return res.message
    } catch (error) {
        console.log(error);
    }
}
