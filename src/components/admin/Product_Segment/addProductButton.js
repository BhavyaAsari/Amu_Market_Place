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

            primary:"bg-linear-to-br from-purple-400 via-violet-400 to-purple-400 text-white ",
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