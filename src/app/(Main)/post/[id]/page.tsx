import { getPost } from "@/actions/getPost.action"
import PostCard from "@/components/PostCard/PostCard"
import { SinglePostResponse } from "@/types/posts.type"
import { Metadata } from "next"
import { cache } from "react"
interface pageProps {
    params: Promise<{ id: string }>
}




export const revalidate = 43200

const getDetailPost = cache(getPost)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const postId = decodeURIComponent(id)
    const res: SinglePostResponse = await getDetailPost(postId)
    return {
        title: `${res.post.user.name} post`,
        description: `${res.post.body}`,
        openGraph: {
            title: `${res.post.user.name} Post`,
            description: `${res.post.body}`,
            images: `${res.post.image ?? ""}`
        },
        icons: {
            icon: `${res.post.user.photo}`
        }
    }

}
export default async function page({ params }: pageProps) {
    const { id } = await params
    const postId = decodeURIComponent(id)
    const res: SinglePostResponse = await getDetailPost(postId)

    return <section className="mt-10">
        <PostCard post={res.post} />
    </section>
};

