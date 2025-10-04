"use server"

import { env } from "@/env";
import { cookies } from "next/headers";


export async function getUserDetails() {
    const token = (await cookies()).get("token")?.value
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
        };

        const req = await fetch(`${env.APIBASEURL}/users/profile-data`, options)
        const res = await req.json()
        

        return {
            data: res
        } 
    } catch (error) {
        console.log(error);

    }
}