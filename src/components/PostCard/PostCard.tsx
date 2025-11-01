"use client";
import { useMemo, useRef, useEffect, useReducer, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { Tooltip } from "@mui/material";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import "react-medium-image-zoom/dist/styles.css";
import { Comment, Post } from "@/types/posts.type";
import Image from "next/image";
import InitialAvatar from "../InitialAvatar/InitialAvatar";
import { formatTimeAgo } from "@/utils/FormatTimeAgo";
import SharingSocial from "../SocialSharing/SocialSharing";
import CommentList from "../CommentsList/CommentList";
import Link from "next/link";

const COMMENTS_INCREMENT = 15;


interface PostCardProps {
    post: Post;
}

interface CommentState {
    open: boolean;
    fullComments: Comment[];
    visibleCommentsCount: number;
    visibleShare: boolean;
    isZoom: boolean;
}

export type CommentAction =
    | { type: "HANDLE_OPEN_COMMENTS" }
    | { type: "HANDLE_CLOSE_COMMENTS" }
    | { type: "HANDLE_CLOSE_Share" }
    | { type: "HANDLE_OPEN_Share" }
    | { type: "SET_FULL_COMMENTS", payload: { comments: Comment[] } }
    | { type: "SET_VISIBLE_COMMENTS_COUNT", payload: { count: number } }
    | { type: "HANDLE_ZOOM_IMAGE", payload: { zoom: boolean } };

const initialReducer: (initialComments: Comment[]) => CommentState = (initialComments) => ({
    open: false,
    fullComments: initialComments,
    visibleCommentsCount: COMMENTS_INCREMENT,
    visibleShare: false,
    isZoom: false,
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
        case "HANDLE_OPEN_Share":
            return {
                ...state,
                visibleShare: true,
            }
        case "HANDLE_CLOSE_Share":
            return {
                ...state,
                visibleShare: false,
            }
        case "HANDLE_ZOOM_IMAGE":
            return {
                ...state,
                isZoom: action.payload.zoom,
            }
        default:
            return state
    }
}


export default function PostCard({ post }: PostCardProps) {
    const [states, dispatch] = useReducer(reducer, post.comments, initialReducer)
    const shareUrl = `${process.env.NEXT_PUBLIC_BASEURL}/post/${post._id}`;
    const namesAccounts = useMemo(() => {
        const nameAccountComments = states.fullComments.map((comment) => {
            return comment.commentCreator.name
        })
        const names = [...new Set(nameAccountComments)]
        return names
    }, [states.fullComments])




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
    const handleUpdateComments = useCallback((editiedComment: Comment) => {
        const indexOldComment = states.fullComments.findIndex(comment => comment._id === editiedComment._id)
        const newComments = [...states.fullComments]
        newComments[indexOldComment] = editiedComment

        dispatch({
            type: "SET_FULL_COMMENTS",
            payload: {
                comments: newComments
            }
        })



    }, [states.fullComments]
    )
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


    return (<>
        <div className="w-full mx-auto bg-white shadow-xl rounded-xl border border-gray-100 mb-8 overflow-hidden">
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
                        <Link href={`/profile/${post.user._id}`} className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer transition-colors duration-150">
                            {post.user.name}
                        </Link>
                        <span className="text-xs -translate-y-1 text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                    </div>
                </div>
                <IconButton size="medium" className="text-gray-500 hover:text-gray-900 transition-colors duration-150">
                    <MoreVertIcon />
                </IconButton>
            </div>

            <div className="px-5 mb-1 text-base text-gray-800 leading-relaxed whitespace-pre-line">
                {post?.body?.length > 300 ? `${post.body.substring(0, 300)}...` : post.body}
            </div>

            {post.image && (
                <div className="w-full p-2 overflow-hidden">
                    <ControlledZoom
                        isZoomed={states.isZoom}
                        onZoomChange={(zoomed) =>
                            dispatch({ type: "HANDLE_ZOOM_IMAGE", payload: { zoom: zoomed } })
                        }
                        canSwipeToUnzoom={true}
                    >
                        <Image
                            src={post.image}
                            alt="Post Image"
                            width={800}
                            height={300}
                            loading="lazy"
                            className={`w-full h-92 object-cover rounded-md cursor-zoom-in transition-transform duration-200`}
                        />
                    </ControlledZoom>
                </div>
            )}



            <div className="flex justify-end items-center px-5 mt-1 ">
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

            <div className="border-t border-gray-100 px-3 py-1 mt-2 flex items-center justify-around gap-2">
                <button className="flex items-center justify-center flex-1 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
                    <FavoriteBorderIcon fontSize="small" className="mr-2" />
                    <span className="text-sm font-semibold">Like</span>
                </button>
                <button
                    onClick={handleOpenComments}
                    className="flex items-center justify-center flex-1 py-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                    <i className="mr-2 fa-regular fa-comment" />
                    <span className="text-sm font-semibold">Comment</span>
                </button>
                <button onClick={() => {
                    dispatch({ type: "HANDLE_OPEN_Share" })
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

            <CommentList open={states.open} onClose={handleClose} DisplayComments={displayedComments} scrollRef={scrollContainerRef} countComments={states.fullComments.length} moreComments={hasMoreComments} dispatchComments={dispatch} postDetails={post} updateComments={handleUpdateComments} loadMore={loadMoreRef} />

        </div>

        <SharingSocial isOpen={states.visibleShare} url={shareUrl} onClose={() => {
            dispatch({ type: "HANDLE_CLOSE_Share" })
        }} />
    </>
    );
}