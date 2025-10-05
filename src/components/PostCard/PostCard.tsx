"use client";
import { useMemo, useRef, useEffect, useReducer } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, InputBase, Tooltip } from "@mui/material";
import { Comment, Post } from "@/types/posts.type";
import Image from "next/image";
import InitialAvatar from "../InitialAvatar/InitialAvatar";
import { formatTimeAgo } from "@/utils/FormatTimeAgo";
import { useFormik } from "formik";
import { useAppSelector } from "@/hooks/Redux.hook";
import * as Yup from "yup"
import { createComment } from "@/actions/createComment.action";
import DisplayComment from "../DisplayComment/DisplayComment";
import toast from "react-hot-toast";

const COMMENTS_INCREMENT = 15;


interface PostCardProps {
    post: Post;
}
const validationSchema = Yup.object({
    content: Yup.string().required().min(2).max(30)
})

interface CommentState {
    open: boolean;
    fullComments: Comment[];
    visibleCommentsCount: number;
}

type CommentAction =
    | { type: "HANDLE_OPEN_COMMENTS" }
    | { type: "HANDLE_CLOSE_COMMENTS" }
    | { type: "SET_FULL_COMMENTS", payload: { comments: Comment[] } }
    | { type: "SET_VISIBLE_COMMENTS_COUNT", payload: { count: number } };

const initialReducer: (initialComments: Comment[]) => CommentState = (initialComments) => ({
    open: false,
    fullComments: initialComments,
    visibleCommentsCount: COMMENTS_INCREMENT
});

const reducer = function (state: CommentState, action: CommentAction): CommentState {
    switch (action.type) {
        case "HANDLE_OPEN_COMMENTS":
            return {
                ...state,
                visibleCommentsCount: COMMENTS_INCREMENT,
                open: true
            }
        case "HANDLE_CLOSE_COMMENTS":
            return {
                ...state,
                open: false
            }
        case "SET_FULL_COMMENTS":
            return {
                ...state,
                fullComments: action.payload.comments,
            }
        case "SET_VISIBLE_COMMENTS_COUNT":
            return {
                ...state,
                visibleCommentsCount: action.payload.count,
            }
        default:
            return state
    }
}

export default function PostCard({ post }: PostCardProps) {
    const [states, dispatch] = useReducer(reducer, post.comments, initialReducer)

    const myAccount = useAppSelector((store) => store.userReducer.data.user)

    const namesAccounts = useMemo(() => {
        const nameAccountComments = states.fullComments.map((comment) => {
            return comment.commentCreator.name
        })
        const names = [...new Set(nameAccountComments)]
        return names
    }, [states.fullComments])


    const formik = useFormik({
        initialValues: {
            content: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            await createComment({ ...values, post: `${post._id}` }).then((res) => {

                if (res && res.message) {
                    dispatch({
                        type: "SET_FULL_COMMENTS",
                        payload: { comments: res.comments }
                    });

                    formik.resetForm({
                        values: { content: "" }
                    });
                }
            })
        }
    })

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const handleOpenComments = () => {
        dispatch({ type: "HANDLE_OPEN_COMMENTS" })
    };

    const handleClose = () => {
        dispatch({ type: "HANDLE_CLOSE_COMMENTS" })
    };

    const sortedComments = useMemo(() => {
        return [...states.fullComments].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [states.fullComments]);

    const displayedComments = sortedComments.slice(0, states.visibleCommentsCount);
    const previewComments = sortedComments.slice(0, 3);
    const hasMoreComments = states.visibleCommentsCount < states.fullComments.length;

    useEffect(() => {
        if (!states.open || !hasMoreComments) return;

        const container = scrollContainerRef.current;
        const loader = loadMoreRef.current;

        const loadMoreComments = () => {
            dispatch({
                type: "SET_VISIBLE_COMMENTS_COUNT",
                payload: {
                    count: Math.min(states.visibleCommentsCount + COMMENTS_INCREMENT, states.fullComments.length)
                }
            });
        };

        if (!container || !loader) {
            const timer = setTimeout(() => {
                const containerCheck = scrollContainerRef.current;
                const loaderCheck = loadMoreRef.current;
                if (containerCheck && loaderCheck) {
                    const observer = new IntersectionObserver(
                        (entries) => {
                            const target = entries[0];
                            if (target.isIntersecting) {
                                loadMoreComments();
                            }
                        },
                        {
                            root: containerCheck,
                            rootMargin: "100px",
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
                    loadMoreComments();
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
    }, [states.open, states.visibleCommentsCount, states.fullComments, hasMoreComments]);

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


            <div className="flex justify-end items-center px-5 pt-3 ">
                <Tooltip
                    classes={{ tooltip: "max-h-43 bg-black/60" }}
                    title={
                        <div >
                            {namesAccounts.slice(0, 9).map((name, index) => (
                                <div className="min-w-20 max-w-40 h-4 overflow-hidden font-sans font-medium" key={index}>
                                    {name}
                                </div>
                            ))}
                            {hasMoreComments && (
                                <div onClick={handleOpenComments} className="flex justify-center text-white font-medium hover:cursor-pointer">
                                    View all ...
                                </div>)
                            }

                        </div>
                    }
                    arrow
                    placement="top"
                >
                    <button
                        onClick={handleOpenComments}
                        className="text-sm text-gray-500 font-medium hover:underline cursor-pointer"
                    >
                        {states.fullComments.length} Comments
                    </button>
                </Tooltip>

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
                <button onClick={() => {
                    const shareUrl = `${process.env.NEXT_PUBLIC_BASEURL}/post/${post._id}`;
                    const shareData = {
                        title: post.user.name,
                        url: shareUrl,
                        Image: String(post.user.photo),

                    };

                    if (navigator.canShare && navigator.canShare(shareData)) {
                        navigator.share(shareData).catch((err) => console.error("Share failed:", err));
                    } else {
                        navigator.clipboard.writeText(shareUrl);
                        toast.success("Copied to clipboard 📋", { duration: 1500 })

                    }
                }} className="flex items-center justify-center flex-1 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200">
                    <ShareIcon fontSize="small" className="mr-2" />
                    <span className="text-sm font-semibold">Share</span>
                </button>
            </div>

            {previewComments.length > 0 && (
                <div onClick={handleOpenComments} className="hover:cursor-pointer px-5 pt-2 pb-4 border-t border-gray-100">

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
                    {states.fullComments.length > previewComments.length && (
                        <button
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-1 ml-11 transition-colors duration-150"
                        >
                            View all {states.fullComments.length} comments
                        </button>
                    )}
                </div>
            )}

            <Dialog open={states.open} classes={{ root: "z-5000" }} disableScrollLock onClose={handleClose} fullWidth maxWidth="sm">
                <div className="flex flex-col max-h-[90vh] overflow-hidden">

                    <div className="p-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-20">
                        <h2 className="text-xl font-bold text-gray-800">Comments ({states.fullComments.length})</h2>
                        <IconButton onClick={handleClose} size="medium" className="text-gray-600 hover:text-red-500">
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex-grow overflow-y-auto px-5 pt-5 comments-scroll-container"
                        style={{ minHeight: '100px' }}
                    >
                        {displayedComments.length > 0 ? (
                            displayedComments.map((comment, index) => {
                                const isLast = index === displayedComments.length - 1;
                                return <div key={comment._id} ref={isLast && hasMoreComments ? loadMoreRef : null}
                                >
                                    <DisplayComment comment={comment} />

                                </div>
                            })
                        ) : (
                            <p className="text-center text-gray-500 py-6 text-base italic">
                                Share your ideas 🚀
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

                            <Box className="flex-grow flex flex-col bg-gray-100 rounded-lg p-2 shadow-sm relative">

                                <InputBase
                                    placeholder={`Comment as ${myAccount.name}`}
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    name="content"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="text-sm text-gray-800 pr-10 h-10 overflow-hidden max-h-10"
                                />
                                <Tooltip classes={{ tooltip: "z-5000" }} title={formik.errors.content} arrow disableFocusListener={true} disableHoverListener={true} disableTouchListener={true}
                                    open placement="top"

                                >
                                    <Button loading={formik.isSubmitting} type="submit" loadingPosition="center" color="primary"
                                        className={`absolute right-2 top-3 text-indigo-600 hover:text-indigo-700 transition-colors duration-150 min-h-8 min-w-8 rounded-full
                                    `}>
                                        {!formik.isSubmitting ? <SendIcon fontSize="small" /> : ""}
                                    </Button>
                                </Tooltip>
                            </Box>
                        </form>
                    </div>

                </div>
            </Dialog>
        </div>
    );
}