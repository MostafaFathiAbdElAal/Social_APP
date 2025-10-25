import { StaticImageData } from "next/image";

export interface ApiResponse {
    message: string;
    paginationInfo: PaginationInfo;
    posts: Post[];
}
export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
    total: number;
}
export interface Post {
    _id: string;
    body: string;
    user: User;
    createdAt: string;
    comments: Comment[];
    image: StaticImageData
}

export interface User {
    _id: string;
    name: string;
    photo: StaticImageData;
}
export interface Comment {
    _id: string;
    content: string;
    commentCreator: User;
    post: string;
    createdAt: string;
    id?:string
}
export interface SinglePostResponse {
    message: string;
    post: Post;
}
export interface Comments {
    message: string,
    comments: Comment[]
}
export interface UpdateCommentResponse {
  message: string;
  comment: Comment;
}
