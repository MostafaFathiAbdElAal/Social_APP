"use server"
import { cookies } from "next/headers"
export default async function logout() {
 
    const cookie = await cookies()
    cookie.delete("token")
    return true
};

