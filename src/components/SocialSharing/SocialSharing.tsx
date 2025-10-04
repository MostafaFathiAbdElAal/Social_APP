"use client"
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
} from "next-share";

export default function SharingSocial({ url }: { url: string }) {
    return (
        <div className="flex gap-4">
            <FacebookShareButton url={url}>FB</FacebookShareButton>
            <TwitterShareButton url={url}>X</TwitterShareButton>
            <WhatsappShareButton url={url}>WA</WhatsappShareButton>
            <TelegramShareButton url={url}>TG</TelegramShareButton>
        </div>
    );
}
