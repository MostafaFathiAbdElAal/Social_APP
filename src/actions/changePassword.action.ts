"use server"
import { env } from "@/env";
import { cookies } from "next/headers";

interface Values {
    password: string,
    newPassword: string
}
export async function changePassword(values: Values) {
    const token = (await cookies()).get("token")?.value
    try {
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
            body: JSON.stringify(values)
        };

        const req = await fetch(
            `${env.APIBASEURL}/users/change-password`,
            options
        );
        
        const res = await req.json();
        if(res.message === "success"){
            (await cookies()).set("token",res.token)
        }
        console.log(res);
        
        return res
    } catch (error) {
        
        console.log(error, "error");
    }
}
