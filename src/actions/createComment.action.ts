"use server"
import { env } from "@/env";
import { Comments } from "@/types/posts.type";
import { cookies } from "next/headers";
interface Values {
    content: string,
    post: string
}

export async function createComment(values: Values) {
    const token = (await cookies()).get("token")?.value
    try {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token ?? ""
            },
            body: JSON.stringify(values)
        };

        const req = await fetch(
            `${env.APIBASEURL}/comments`,
            options
        );
        const res: Comments = await req.json();
        let comments;
        for (const key in res.comments[0]) {

            console.log(key)
        }
        console.log(res.comments[0].id === res.comments[0]._id);

        if (res.message === "success") {

            comments = res.comments.map((comment) => {
                return {
                    _id: comment._id,
                    commentCreator: comment.commentCreator,
                    content: comment.content,
                    createdAt: comment.createdAt,
                    post: comment.post
                }

            })
            return {
                message: res.message,
                comments
            }
        } else {
            return res
        }

    } catch (error) {

        console.log(error, "error");

    }
}
