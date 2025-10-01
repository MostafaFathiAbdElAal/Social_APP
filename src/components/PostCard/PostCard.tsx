"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Box, InputBase } from "@mui/material"; // استخدام InputBase لمرونة التصميم
import { Post } from "@/types/posts.type";
import Image from "next/image";
import InitialAvatar from "../InitialAvatar/InitialAvatar";
import { formatTimeAgo } from "@/utils/FormatTimeAgo";
import { useFormik } from "formik";
import { useAppSelector } from "@/hooks/Redux.hook";
import * as Yup from "yup"
const COMMENTS_INCREMENT = 15; // ✅ بدل 10 خلتها 20


interface PostCardProps {
    post: Post;
}
const validationSchema = Yup.object({
    content: Yup.string().required().min(2).max(400)
})
export default function PostCard({ post }: PostCardProps) {
    const [open, setOpen] = useState(false);
    const [visibleCommentsCount, setVisibleCommentsCount] = useState(COMMENTS_INCREMENT);
    const myAccount = useAppSelector((store) => store.userReducer.data.user)
    const formik = useFormik({
        initialValues: {
            content: "",
            post: `${post._id}`
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);

        }
    })
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const fullComments = post.comments;

    const handleOpenComments = () => {
        setVisibleCommentsCount(COMMENTS_INCREMENT);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sortedComments = useMemo(() => {
        return [...fullComments].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [fullComments]);

    const displayedComments = sortedComments.slice(0, visibleCommentsCount);
    const previewComments = sortedComments.slice(0, 3);
    const hasMoreComments = visibleCommentsCount < fullComments.length;

    useEffect(() => {
        if (!open || !hasMoreComments) return;

        const container = scrollContainerRef.current;
        const loader = loadMoreRef.current;

        if (!container || !loader) {
            // نستنى الـ refs لما تتظبط بعد render
            const timer = setTimeout(() => {
                const containerCheck = scrollContainerRef.current;
                const loaderCheck = loadMoreRef.current;
                if (containerCheck && loaderCheck) {
                    const observer = new IntersectionObserver(
                        (entries) => {
                            const target = entries[0];
                            if (target.isIntersecting) {
                                setVisibleCommentsCount((prev) =>
                                    Math.min(prev + COMMENTS_INCREMENT, fullComments.length)
                                );
                            }
                        },
                        {
                            root: containerCheck,
                            rootMargin: "300px",
                            threshold: 1.0,
                        }
                    );
                    observer.observe(loaderCheck);
                }
            }, 100);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting) {
                    setVisibleCommentsCount((prev) =>
                        Math.min(prev + COMMENTS_INCREMENT, fullComments.length)
                    );
                }
            },
            {
                root: container,
                rootMargin: "100px",
                threshold: 1.0,
            }
        );

        observer.observe(loader);

        return () => {
            if (loader) observer.unobserve(loader);
        };
    }, [open, hasMoreComments, fullComments.length, visibleCommentsCount]);
    return (
        <div className="max-w-xl min-w-xs w-full mx-auto bg-white shadow-2xl rounded-xl border border-gray-100 mb-8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                    <div className="rounded-full overflow-hidden w-11 h-11 ring-2 ring-indigo-500 ring-offset-2">
                        <Image
                            src={post.user.photo}
                            alt={post.user.name}
                            height={44}
                            width={44}
                            className="object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors duration-150">
                            {post.user.name}
                        </span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                    </div>
                </div>
                <IconButton size="medium" className="text-gray-500 hover:text-gray-900 transition-colors duration-150">
                    <MoreVertIcon />
                </IconButton>
            </div>

            <div className="px-5 pb-3 text-base text-gray-800 leading-relaxed whitespace-pre-line">
                {post?.body?.length > 300 ? `${post.body.substring(0, 300)}...` : post.body}
            </div>

            {post.image && (
                <div className="w-full bg-gray-100 overflow-hidden">
                    <Image
                        src={post.image}
                        alt="Post Image"
                        width={800}
                        height={300}
                        loading="lazy"
                        className="w-full h-92 object-cover rounded-md transition-transform duration-500 hover:scale-105"
                    />
                </div>
            )}


            <div className="flex justify-between items-center px-5 pt-3">
                <span className="text-sm text-gray-500 font-medium hover:underline cursor-pointer">
                    0 Likes
                </span>
                <button
                    onClick={handleOpenComments}
                    className="text-sm text-gray-500 font-medium hover:underline cursor-pointer"
                >
                    {fullComments.length} Comments
                </button>
            </div>

            <div className="border-t border-gray-100 px-3 py-1 mt-2 flex items-center justify-around">
                <button className="flex items-center justify-center flex-1 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    <FavoriteBorderIcon fontSize="small" className="mr-2" />
                    <span className="text-sm font-semibold">Like</span>
                </button>
                <button
                    onClick={handleOpenComments}
                    className="flex items-center justify-center flex-1 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                    <ChatBubbleOutlineIcon fontSize="small" className="mr-2" />
                    <span className="text-sm font-semibold">Comment</span>
                </button>
                <button className="flex items-center justify-center flex-1 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                    <ShareIcon fontSize="small" className="mr-2" />
                    <span className="text-sm font-semibold">Share</span>
                </button>
            </div>

            {previewComments.length > 0 && (
                <div className="px-5 pt-2 pb-4 border-t border-gray-100">
                    {previewComments.map((comment) => (
                        <div key={comment._id} className="flex gap-3 mb-2 items-start mt-1">
                            <InitialAvatar name={comment.commentCreator.name} size="small" />
                            <div className=" bg-gray-100 rounded-xl px-3 py-2 text-sm leading-snug">
                                <span className="font-bold text-gray-800 text-xs hover:underline cursor-pointer mr-1">
                                    {comment.commentCreator.name}
                                </span>
                                <p className=" text-gray-700">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    {fullComments.length > previewComments.length && (
                        <button
                            onClick={handleOpenComments}
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-1 ml-11 transition-colors duration-150"
                        >
                            View all {fullComments.length} comments
                        </button>
                    )}
                </div>
            )}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <div className="flex flex-col max-h-[90vh]">

                    {/* Header */}
                    <div className="p-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-20">
                        <h2 className="text-xl font-bold text-gray-800">Comments ({fullComments.length})</h2>
                        <IconButton onClick={handleClose} size="medium" className="text-gray-600 hover:text-red-500">
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {/* Body - Comments List (Scrollable) */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-grow overflow-y-auto px-5 pt-5 pb-20 comments-scroll-container"
                        style={{ minHeight: '100px' }}
                    >
                        {displayedComments.length > 0 ? (
                            displayedComments.map((comment, index) => {
                                const isLast = index === displayedComments.length - 1;
                                return (
                                    <div
                                        key={comment._id}
                                        ref={isLast && hasMoreComments ? loadMoreRef : null}
                                        className="flex gap-3 mb-4 items-start"
                                    >
                                        <InitialAvatar name={comment.commentCreator.name} size="medium" />
                                        <div className="flex flex-col flex-grow bg-gray-50 rounded-lg p-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-sm text-gray-800 hover:underline cursor-pointer">
                                                    {comment.commentCreator.name}
                                                </span>
                                                <span className="text-xs text-gray-400">{formatTimeAgo(comment.createdAt)}</span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                                            <div className="flex gap-3 text-xs mt-2">
                                                <button className="text-gray-500 hover:text-blue-500 font-medium transition-colors duration-150">Like</button>
                                                <button className="text-gray-500 hover:text-blue-500 font-medium transition-colors duration-150">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-500 py-6 text-base italic">
                                كن أول من يشارك أفكاره! 🚀
                            </p>
                        )}

                        {hasMoreComments && (
                            <div className="flex justify-center my-4 text-indigo-600 font-medium">
                                ... Loading more comments
                            </div>
                        )}
                    </div>

                    <div
                        className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-20" // padding أقل قليلاً
                    >
                        <form onSubmit={formik.handleSubmit} className="flex items-start gap-2"> 
                            <div className="flex flex-col items-center rounded-full overflow-hidden">
                                <Image alt="user image" src={myAccount.photo} width={20} height={20} className="w-full h-full object-contain" />
                            </div>

                            <Box className="flex-grow flex flex-col bg-gray-100 rounded-lg p-2 shadow-sm relative"> {/* Rounded-lg و Shadow */}
                                <InputBase
                                    placeholder={`Comment as ${myAccount.name}`} 
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    name="content"
                                    onChange={formik.handleChange}
                                    className="text-sm text-gray-800 pr-10 h-10 overflow-hidden max-h-10" // مسافة لزر الإرسال

                                />

                                {/* زر الإرسال داخل حقل الإدخال */}
                                <IconButton
                                    type="submit"
                                    size="small"
                                    className={`
                                        absolute right-2 top-2 
                                        text-indigo-600 hover:text-indigo-700'}
                                        transition-colors duration-150
                                    `}
                                >
                                    <SendIcon fontSize="small" />
                                </IconButton>


                            </Box>
                        </form>
                    </div>

                </div>
            </Dialog>
        </div>
    );
}
