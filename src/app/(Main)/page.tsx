import { getPosts } from "@/actions/getAllPosts.action";
import PostCard from "@/components/PostCard/PostCard";
import SliderUsers from "@/components/SliderUsers/SliderUsers";
import { ApiResponse } from "@/types/posts.type";
export default async function Home() {
  const res: ApiResponse = await getPosts();
  const resUsers = res.posts.map(post => post.user).filter((user, index, self) => {
    return index === self.findIndex((u) => u._id === user._id)
  }
  );



  return <>
    <section className="mb-3">
      <SliderUsers users={resUsers} />
    </section>
    <section className="flex flex-col items-center gap-5">
      {
        res.posts.map((post, index) => <PostCard key={index} post={post} />)
      }
    </section>
  </>
}
