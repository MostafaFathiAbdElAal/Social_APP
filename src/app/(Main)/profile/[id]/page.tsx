import { getUserPosts } from "@/actions/getUserPosts.action";
import { Post } from "@/types/posts.type";
interface PageProps {
    params: {
        id: string
    }
}
export default async function page({ params }: PageProps) {
    const { id } = await params
    const res: Post[] = await getUserPosts(id)
    console.log(res);
    return <section className="mt-10 flex justify-center items-center">
        <p>Not working {id}</p>
    </section>
};

