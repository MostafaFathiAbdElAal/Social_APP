"use server"
import { env } from "@/env";
import { cookies } from "next/headers";
interface Values  {
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
            `${env.APIBASEURL}/users/signin`,
            options
        );
        const res = await req.json();
        if (res.message === "success") {
                (await cookies()).set("token", res.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24,
                    path: "/",
                    
                })
        }

console.log(res);

 if (req.ok) {
            return res.message
        } else {
            return res
        }
    } catch (error) {
        console.log(error);

    }
}
