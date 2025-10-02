import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const myPages = ["/login", "/signup"];

    return myPages.map((page) => {
        return {
            url: `${process.env.NEXT_PUBLIC_BASEURL}${page}`,
            priority: 1,
            lastModified: new Date()
        }
    })
};

