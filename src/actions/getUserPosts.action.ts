"use server"
import { env } from "@/env";
import { cookies } from "next/headers";

export async function getUserPosts(userId: string) {
    const token = (await cookies()).get("token")?.value
    try {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
            next: { revalidate: 43200 },
        };

        const req = await fetch(
            `${env.APIBASEURL}/users/${userId}/posts?limit=2`,
            options
        );
        
        const res = await req.json();
        console.log(res);
        return res
    } catch (error) {

        console.log(error, "error");

    }
}
