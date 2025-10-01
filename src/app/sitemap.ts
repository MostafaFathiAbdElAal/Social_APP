import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const myPages = ["/login", "/signup"];

    return myPages.map((page) => {
        return {
            url: `${process.env.BASEURL}${page}`,
            priority: 1,
            lastModified: new Date()
        }
    })
};

