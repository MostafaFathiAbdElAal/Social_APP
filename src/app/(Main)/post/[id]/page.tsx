import { getPost } from "@/actions/getPost.action";
import PostCard from "@/components/PostCard/PostCard";
import { env } from "@/env";
import { SinglePostResponse } from "@/types/posts.type";
import { Metadata } from "next";
interface PageProps {
    params: Promise<{ id: string }>
}
const getDetailPost = getPost;
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const postId = decodeURIComponent(id);
    const res: SinglePostResponse = await getDetailPost(postId);

    return {
        metadataBase: new URL(env.NEXT_PUBLIC_BASEURL),
        title: `${res.post.user.name} post`,
        description: res.post.body,
        openGraph: {
            title: `${res.post.user.name} Post`,
            description: res.post.body,
            images: String(res.post.image),
        },
        icons: {
            icon: String(res.post.user.photo),
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params
    const postId = decodeURIComponent(id);
    const res: SinglePostResponse = await getDetailPost(postId);

    return (
        <section className="mt-10">
            <PostCard post={res.post} />
        </section>
    );
}
