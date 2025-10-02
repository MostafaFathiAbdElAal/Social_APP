"use client"

import { Comment as pageProps } from "@/types/posts.type"
import InitialAvatar from "../InitialAvatar/InitialAvatar"
import { formatTimeAgo } from "@/utils/FormatTimeAgo"

export default function DisplayComment({ comment }: { comment: pageProps }) {
    return <div
        key={comment._id}
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
};

