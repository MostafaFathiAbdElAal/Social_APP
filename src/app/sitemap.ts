import { getPosts } from "@/actions/getAllPosts.action";
import { env } from "@/env";
import { ApiResponse } from "@/types/posts.type";
import { MetadataRoute } from "next";
export const revalidate = 86400;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const myPages = [env.NEXT_PUBLIC_BASEURL, "/login", "/signup"];
    const users = []

    const { paginationInfo }: ApiResponse = await getPosts();
    for (let page: number = 1; page <= paginationInfo.numberOfPages; page++) {
        const { posts }: ApiResponse = await getPosts(page); 
        myPages.push(...posts.map(post => `/post/${post._id}`));
        users.push(...posts.map(post => post.user));
    }
    const uniqueUsers = users.filter((user, index, self) =>
        index === self.findIndex((u) => u._id === user._id)
    );
    return [...myPages.map((page) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASEURL}${page}`,
            priority: 1,
            lastModified: new Date()
        }
    }),...uniqueUsers.map((user) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASEURL}/profile/${user._id}`,
            priority: 0.8,
            lastModified: new Date()
        }
    })]
};

