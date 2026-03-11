"use client";

export default function AdminCard({children ,bgColor=""}) {


    return (

        <>
        
        <main className={`admin-card ${bgColor}`}>

            {/* <p>Reusbale Admin Card</p> */}
            {children}

        </main>
        
        </>
    )




}