"use client";

import Link from "next/link";   

export default function AddProductActionButton ({
    children,
    href,
    onClick,
    type = "button",
    variant = "primary",
    }) {

        const baseStyle = 
        "px-4 py-3 rounded-lg font-semibold transition text-center w-52 ";

        const variants = {

            primary:"bg-linear-to-b from-purple-400 via-violet-700 to-purple-600 text-white border border-black/5 hover:bg-linear-to-tl from-purple-400 via-purple-600 to-purple-300 transition-all duration-300 ",
            secondary:"bg-gray-500 text-white hover:bg-gray-600",
            danger:"bg-red-500 text-white hover:bg-red-600",
        };


        const className = `${baseStyle} ${variants[variant]}`;

        if(href) {

            return (

                <Link href={href} className={className}>
                    {children}
                </Link>
            );
        }

        return (

            <button type={type} onClick={onClick} className={className}>{children}</button>
        )


}