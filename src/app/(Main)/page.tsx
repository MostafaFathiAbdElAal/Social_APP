import PostCard from "@/components/PostCard/PostCard";
import { ApiResponse } from "@/types/posts.type";
import { cookies } from "next/headers"

export default async function Home() {
  const token = (await cookies()).get("token")?.value
  console.log(token);

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token ?? ""
    },
  }
  const req = await fetch(`${process.env.APIBASEURL}/posts?limit=50`, options)
  const res: ApiResponse = await req.json()
  
  return <section className="flex flex-col items-center gap-5">
    {
      
      res.posts.map((post, index) => <PostCard key={index} post={post}/>)
    }

  </section>
}
