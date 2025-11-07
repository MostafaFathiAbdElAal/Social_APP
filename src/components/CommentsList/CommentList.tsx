'use client'
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup"
import { Box, InputBase } from "@mui/material";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import { createComment } from "@/actions/createComment.action";
import { useAppSelector } from "@/hooks/Redux.hook";
import DisplayComment from "../DisplayComment/DisplayComment";
import Image from "next/image";
import { Comment, Post } from "@/types/posts.type";
import { CommentAction } from "../PostCard/PostCard";
import { motion, AnimatePresence } from "framer-motion";
interface commentListProps {
    open: boolean;
    onClose: () => void;
    DisplayComments: Comment[];
    scrollRef: React.RefObject<HTMLDivElement | null>;
    countComments: number;
    moreComments: boolean;
    dispatchComments: React.Dispatch<CommentAction>;
    postDetails: Post;
    updateComments: (editiedComment: Comment) => void;
    loadMore: React.RefObject<HTMLDivElement | null>;
}
const validationSchema = Yup.object({
    content: Yup.string().required().min(2).max(30)
})
export default function CommentList({ open, onClose, DisplayComments, scrollRef, countComments, moreComments, dispatchComments, postDetails, updateComments, loadMore }: commentListProps) {
    const myAccount = useAppSelector((store) => store.userReducer.data.user)
    const formik = useFormik({
        initialValues: {
            content: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            await createComment({ ...values, post: `${postDetails._id}` }).then((res) => {

                if (res && res.message) {
                    dispatchComments({
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
    return <AnimatePresence>
        {
            open && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="z-5000 fixed right-0 left-0 top-0 bottom-0 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose()
                    }
                }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{  opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 22,
                        duration: 0.35,
                    }}
                    className="flex flex-col max-h-[90vh] overflow-hidden max-w-xl w-full rounded-sm bg-white">

                    <div className="p-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-20">
                        <h2 className="text-xl font-bold text-gray-800">Comments ({countComments})</h2>
                        <IconButton onClick={onClose} size="medium" className="text-gray-600 hover:text-red-500">
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto px-5 pt-5 comments-scroll-container"
                        style={{ minHeight: '100px' }}
                    >
                        {myAccount._id ? DisplayComments.length > 0 ? (
                            DisplayComments.map((comment, index) => {
                                const isLast = index === DisplayComments.length - 1;
                                return <div key={comment._id} ref={isLast && moreComments ? loadMore : null}
                                >
                                    <DisplayComment comment={comment} currentPost={postDetails} changeComments={updateComments} />

                                </div>
                            })
                        ) : (
                            <p className="text-center text-gray-500 py-6 text-base italic">
                                Share your ideas 🚀
                            </p>
                        ) : <div className="h-82 flex flex-col gap-10">
                            <div className="flex gap-3">
                                <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="animate-pulse bg-gray-300 w-1/4 h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-2/3 h-3 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="animate-pulse bg-gray-300 w-1/4 h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-2/3 h-3 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="animate-pulse bg-gray-300 w-1/4 h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-2/3 h-3 rounded-full"></div>
                                </div>
                            </div>

                        </div>}

                        {moreComments && myAccount._id && (
                            <div className="flex gap-3 mb-2">
                                <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="animate-pulse bg-gray-300 w-1/4 h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-full h-3 rounded-full"></div>
                                    <div className="animate-pulse bg-gray-300 w-2/3 h-3 rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {
                        myAccount._id ? <div
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
                                        autoComplete="false"
                                    />

                                    <button type="submit"
                                        className={`absolute right-2 top-3 text-indigo-600 hover:text-indigo-700 transition-colors duration-150 min-h-8 min-w-8 rounded-full text-[18px] 
                                    `}>
                                        {!formik.isSubmitting ? <i className={`${formik.errors.content ? "fa-regular" : formik.values.content !== "" ? "fa-solid" : "fa-regular"} fa-paper-plane`}></i> : ""}
                                    </button>
                                </Box>
                            </form>
                        </div> : ""

                    }

                </motion.div>
            </motion.div>
        }
    </AnimatePresence>

};



