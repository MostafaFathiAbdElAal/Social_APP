"use server"

import { revalidatePath } from "next/cache"

export async function rebuildPostPage(id: string) {
    revalidatePath(`/post/${id}`)
}

