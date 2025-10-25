"use server"
import { env } from "@/env";
import { UpdateCommentResponse } from "@/types/posts.type";
import { cookies } from "next/headers";
import { rebuildPostPage } from "./rebuildPages";

export async function updateComment(commentID: string, values: { content: string }) {
    const token = (await cookies()).get("token")?.value
    try {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
            body: JSON.stringify({ content: values.content })
        };

        const req = await fetch(
            `${env.APIBASEURL}/comments/${commentID}`,
            options
        );

        const res: UpdateCommentResponse = await req.json();
        if (res.message === "success") {
            rebuildPostPage(res.comment.post)
        }
        console.log(res);
        
        return res;
    } catch (error) {
        console.log(error, "error");
    }
}
