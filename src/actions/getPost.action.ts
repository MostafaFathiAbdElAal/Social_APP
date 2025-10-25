"use server"
import { env } from "@/env";
import { cookies } from "next/headers";

export async function getPost(id: string) {
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
            `${env.APIBASEURL}/posts/${id}`,
            options
        );
        const res = await req.json();
        return res
    } catch (error) {

        console.log(error, "error");

    }
}
