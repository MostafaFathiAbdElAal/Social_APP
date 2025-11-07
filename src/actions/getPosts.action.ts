"use server"
import { env } from "@/env";
import { cookies } from "next/headers";

export async function getPosts(page: number = 1) {
    const token = (await cookies()).get("token")?.value

    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
            cache: "no-store"
        };
console.log(options);
        const req = await fetch(`${env.APIBASEURL}/posts?page=${page}`, options);
        const res = await req.json();
        console.log(res);
        
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}

