"use client";
import {SessionProvider} from "next-auth/react";

export default function AuthLayout ({children}) {

    return (

        <main>
            <SessionProvider>
                {children}
            </SessionProvider>
        </main>
    )
}