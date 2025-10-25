"use client";

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
} from "next-share";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QR from "../QR/QR";
interface ComponentProps {
    url: string;
    isOpen: boolean;
    onClose: () => void;
}
export default function SharingSocial({
    url,
    isOpen,
    onClose,
}: ComponentProps) {
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
        if (!copied) {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [url, copied]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    className="fixed inset-0 z-50 select-none flex justify-center items-center bg-black/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            onClose()
                        }

                    }}
                >
                    <motion.div
                        className="relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg text-center"
                        initial={{ y: 300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 22,
                            duration: 0.35,
                        }}

                    >
                        <div className="w-fit relative -left-5 -top-3">
                            <QR value={url} />
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <CloseIcon />
                        </button>

                        <h3 className="text-[#070a2b] text-lg font-semibold mb-6">
                            Share this post
                        </h3>

                        <div className="flex justify-center gap-5 mb-6">
                            <FacebookShareButton url={url}>
                                <div className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 p-3 rounded-full transition">
                                    <FacebookIcon sx={{ color: "#1877F2", fontSize: 32 }} />
                                </div>
                            </FacebookShareButton>

                            <TwitterShareButton url={url}>
                                <div className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 p-3 rounded-full transition">
                                    <TwitterIcon sx={{ color: "#1DA1F2", fontSize: 32 }} />
                                </div>
                            </TwitterShareButton>

                            <WhatsappShareButton url={url}>
                                <div className="bg-[#25D366]/10 hover:bg-[#25D366]/20 p-3 rounded-full transition">
                                    <WhatsAppIcon sx={{ color: "#25D366", fontSize: 32 }} />
                                </div>
                            </WhatsappShareButton>

                            <TelegramShareButton url={url}>
                                <div className="bg-[#0088cc]/10 hover:bg-[#0088cc]/20 p-3 rounded-full transition">
                                    <TelegramIcon sx={{ color: "#0088cc", fontSize: 32 }} />
                                </div>
                            </TelegramShareButton>
                        </div>

                        <div className="border border-gray-200 text-xs font-medium rounded-lg grid grid-cols-14 items-center px-3 py-2 bg-gray-50">
                            <p className="line-clamp-1 col-span-11 justify-self-start">
                                {url}
                            </p>
                            <button
                                onClick={handleCopy}
                                className="text-pink-600 col-span-3 justify-self-end hover:text-pink-700 flex items-center gap-1"
                            >


                                
                                    <ContentCopyIcon sx={{ fontSize: 18 }} /> {copied ? "copied!" : "copy"}
                            </button>
                        </div>
                    </motion.div>
                </motion.section>
            )
            }
        </AnimatePresence >
    );
}
