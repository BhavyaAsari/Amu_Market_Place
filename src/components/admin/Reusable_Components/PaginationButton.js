"use client";

import { useRouter,useSearchParams } from "next/navigation";

export default function PaginationButton({totalPages}) {

    // console.log("Total Pages in Paginaton:",totalPages);

    const router = useRouter();

    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const changePage = (page) => {

        const params = new URLSearchParams(searchParams);

        params.set("page",page);

        router.push(`?${params.toString()}`,{scroll:false});
    };


    return (


        <div>

            {Array.from({length:totalPages},(_,i) => {

                const page = i + 1;

                return (


                    <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`px-3 py-1 rounded text-sm 
                        ${page === currentPage
                            ? "bg-purple-600 text-white": "bg-gray-200 hover:bg-gray-300 m-3"
                        }`}>{page}</button>
                )
            })}
        </div>
    )





}