"use server"
import { env } from "@/env";
import { cookies } from "next/headers";


export async function removeComment(commentId: string) {
    const token = (await cookies()).get("token")?.value
    try {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
        };

        const req = await fetch(
            `${env.APIBASEURL}/comments/${commentId}`,
            options
        );
        const res = await req.json();
        /*

        API dosent work when work log data and
        dont forget rebuild page below 👇  
        if (res.message === "success") {
                rebuildPostPage(res.comment.post)
            }
            
            */
        return res
    } catch (error) {

        console.log(error, "error");

    }
}
