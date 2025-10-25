"use client"
import Image from "next/image";
import prof from "@/assets/images/Profile.jpg"
export default function CardLog() {
    return <div className="relative group bg-white rounded-md border border-gray-300 shadow h-55 w-45 flex flex-col items-center transition-shadow duration-300 hover:shadow-md hover:shadow-gray-500 cursor-pointer">

                            <button className="fa-solid fa-x text-[9px] text-white w-3 h-3 center bg-gray-400/80 p-2  rounded-full absolute top-1 left-1 group-hover:origin-bottom-right transition-transform duration-50 group-hover:bg-white group-hover:text-gray-400 group-hover:scale-150 shadow-closeIcon"></button>


                            <div className="h-[85%] w-full rounded-md overflow-hidden">
                                <Image
                                    src={prof}
                                    alt="profile"
                                    className="object-cover h-full w-full"
                                />
                            </div>


                            <div className="min-h-[15%] flex items-center justify-center w-full">
                                <p className="font-semibold">Mostafa</p>
                            </div>
                        </div>
};

