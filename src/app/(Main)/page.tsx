import { getPosts } from "@/actions/getAllPosts.action";
import PostCard from "@/components/PostCard/PostCard";
import SliderUsers from "@/components/SliderUsers/SliderUsers";
import { ApiResponse } from "@/types/posts.type";
import { cookies } from "next/headers"

export default async function Home() {
  const token = (await cookies()).get("token")?.value
  console.log(token);
  const res: ApiResponse = await getPosts();
  const resUsers = res.posts.map(post => post.user).filter((user, index, self) => {
    return index === self.findIndex((u) => u._id === user._id)
  }
  );

  

  return <>
    <section className="mb-2">
      <SliderUsers users={resUsers} />
    </section>
    <section className="flex flex-col items-center gap-5">
      {

        res.posts.map((post, index) => <PostCard key={index} post={post} />)
      }

    </section>
  </>
}
