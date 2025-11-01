"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { User } from "@/types/posts.type";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import SliderLoader from "../SliderLoader/SliderLoader";

interface SliderUsersProps {
    users: User[];
}

export default function SliderUsers({ users }: SliderUsersProps) {
    // 🔹 حل مشكلة SSR hydration: نمنع التحميل قبل الـ client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <SliderLoader/>;
    return (
        <Swiper
            key={users.length}
            spaceBetween={5}
            loop={true}
            observer={true}
            observeParents={true}
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            
            breakpoints={{
                250: { slidesPerView: 3 },
                400: { slidesPerView: 5 },
                500: { slidesPerView: 6 },
            }}
            className="py-2"
        >
            {users.map((user) => (
                <SwiperSlide key={user._id}>
                    <Link
                        href={`/profile/${user._id}`}
                        className="flex flex-col items-center justify-center"
                    >
                        <div className="w-17 h-17 overflow-hidden rounded-full p-1 border-2 border-pink-500 flex items-center justify-center">
                            <Image
                                src={user.photo}
                                alt={user.name}
                                height={44}
                                width={44}
                                className="object-cover w-full h-full rounded-full"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-xs mt-1 line-clamp-1">{user.name}</p>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
