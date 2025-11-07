"use client"
import { Comment, Comment as pageProps, Post } from "@/types/posts.type"
import InitialAvatar from "../InitialAvatar/InitialAvatar"
import { formatTimeAgo } from "@/utils/FormatTimeAgo"
import { Button, InputBase } from "@mui/material"
import { useAppSelector } from "@/hooks/Redux.hook"
import { useCallback, useReducer } from "react"
import { removeComment } from "@/actions/removeComment.action"
import toast from "react-hot-toast"
import { useFormik } from "formik"
import { updateComment } from "@/actions/updateComment.action"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
interface InitialReducer {
    isLoading?: boolean,
    isErrorRemove?: boolean,
    isEditing?: boolean
}
interface ActionReducer {
    type: string,
    payload: InitialReducer
}
interface InitialValues {
    content: string
}
const initialReducer = {
    isLoading: false,
    isErrorRemove: false,
    isEditing: false
}

const reducer = function (state: InitialReducer, action: ActionReducer) {
    switch (action.type) {
        case "removeError":
            return {
                ...state,
                isErrorRemove: action.payload.isErrorRemove,
            }
        case "Editing":
            return {
                ...state,
                isEditing: action.payload.isEditing
            }
        case "isLoading":
            return {
                ...state,
                isLoading: action.payload.isLoading,
            }
        default:
            return state
    }
}
interface DisplayCommentProps {
    comment: pageProps;
    currentPost: Post;
    changeComments: (comment: Comment) => void;
}
export default function DisplayComment({ comment, changeComments, currentPost }: DisplayCommentProps) {
    const myAccount = useAppSelector((store) => store.userReducer.data)
    const [status, dispatch] = useReducer(reducer, initialReducer)



    const initialValues: InitialValues = {
        content: comment.content
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            if (values.content !== formik.initialValues.content) {
                const res = await updateComment(comment._id, values)
                if (res?.message === "success") {
                    changeComments(res?.comment)
                }

            }

            dispatch({
                type: "Editing",
                payload: { isEditing: false }
            })
        }
    })

    const deleteComment = useCallback(async () => {
        dispatch({
            type: "isLoading", payload: {
                isLoading: true
            }
        })
        const res = await removeComment(comment._id)
        dispatch({
            type: "isLoading", payload: {
                isLoading: false
            }
        })
        if (res.message === "you are not allowed to perform this action.") {
            toast.error(res.message, { duration: 3000 })
            dispatch({
                type: "removeError", payload: {
                    isErrorRemove: true
                }
            })
        }
    }, [comment._id])

    return <div>
        <div
            key={comment._id}
            className="flex flex-wrap gap-3 items-start"
        >
            <InitialAvatar name={comment.commentCreator.name} size="medium" />
            <div className="flex flex-col bg-gray-50 flex-grow rounded-lg p-3">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-800 hover:underline cursor-pointer">
                        {comment.commentCreator.name}
                    </span>
                    {
                        comment.commentCreator._id === currentPost.user._id ? <span className="text-xs font-semibold flex items-center gap-0.5">
                            <span className="text-cyan-600"><DriveFileRenameOutlineIcon fontSize="inherit" /></span> Author
                        </span> : ""
                    }
                </div>

                {status.isEditing ? (
                    <form>
                        <InputBase
                            fullWidth
                            multiline
                            maxRows={4}
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={() => {
                                if (formik.isSubmitting && status.isEditing) {
                                    dispatch({
                                        type: "Editing",
                                        payload: { isEditing: false }
                                    })
                                }
                            }}
                            autoFocus
                            onFocus={(e) => {
                                const len = e.currentTarget.value.length
                                e.currentTarget.setSelectionRange(len, len)
                            }}

                            className="text-sm text-gray-700 mt-1"
                        />
                    </form>
                ) : (
                    <p className="text-sm text-gray-700 mt-1">{formik.values.content}</p>
                )}
            </div>

            <div className="flex w-full gap-5 justify-start text-xs *:translate-x-16 *:-translate-y-3 *:min-w-10">
                <span className="text-xs text-gray-500 font-medium transition-colors duration-150">
                    {formatTimeAgo(comment.createdAt)}
                </span>

                {comment.commentCreator._id === myAccount.user._id && (
                    <>
                        {status.isEditing ? (
                            <Button
                                className="p-0 min-w-0 h-auto text-gray-500 hover:text-LinkColor font-medium transition-colors duration-150 hover:bg-transparent text-xs"
                                loading={formik.isSubmitting}
                                loadingPosition="center"
                                disableRipple
                                disableElevation
                                variant="text"
                                onClick={() => { formik.handleSubmit() }}
                            >
                                {formik.isSubmitting ? "" : "Submit"}
                            </Button>
                        ) : (
                            <Button
                                variant="text"
                                disableElevation
                                disableRipple
                                onClick={() => {
                                    dispatch({
                                        type: "Editing",
                                        payload: { isEditing: true }
                                    })
                                }}
                                className="p-0 min-w-0 h-auto text-gray-500 hover:text-LinkColor font-medium transition-colors duration-150 hover:bg-transparent text-xs"
                            >
                                Edit
                            </Button>
                        )}

                        <Button
                            variant="text"
                            disableElevation
                            loading={status.isLoading}
                            loadingPosition="center"
                            className="p-0 h-auto text-gray-500 hover:text-LinkColor font-medium transition-colors duration-150 hover:bg-transparent text-xs"
                            onClick={deleteComment}
                        // disabled={status.isErrorRemove || status.isLoading}
                        >
                            {status.isLoading ? "" : "Delete"}
                        </Button>

                    </>
                )}
            </div>
        </div>
    </div>
};
