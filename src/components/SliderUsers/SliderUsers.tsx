/*

25/10/2025
There are bug in this component bug : 
resize window and overflow size long 
problem caused by swiper 💔

*/
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { User } from "@/types/posts.type";
import Image from "next/image";
import Link from "next/link";
import "swiper/swiper.css"
import { Autoplay } from "swiper/modules";
interface SliderUsersProps {
    users: User[]
}

export default function SliderUsers({ users }: SliderUsersProps) {
    return (
        <Swiper
            spaceBetween={5}
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            slidesPerView={7}
            className="py-2"
        >
            {users.map((user) => (
                <SwiperSlide key={user._id} >
                    <Link href={`/profile/${user._id}`} className="flex flex-col items-center justify-center">
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
