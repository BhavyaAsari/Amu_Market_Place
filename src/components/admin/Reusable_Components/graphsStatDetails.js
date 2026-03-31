"use client";

export default function  StatsDetails({statsDetails,statConfig}) {


    return (

        <main className="statsDetailsContainer rounded-lg shadow-sm border border-white/40">

            <h3 className="text-white font-semibold mb-3 text-lg text-glow drop-shadow-[0px_2px_2px_rgba(0,0,0,0.7)]  textDropShadow">Status Breakdown</h3>

            <div>
                {statsDetails.map((item,index) => {

                    const meta = statConfig?.[item.status] || {};
                        const total = statsDetails.reduce((sum, item) => sum + item.count, 0);


                    return (

                         <div
                         key={index}
                         className="flex justify-between items-center text-sm ">
                             <div className="flex items-center gap-2">
                                <span
                                className="w-4 h-4 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.3)]"
                                style={{backgroundColor: meta.color || "#fff"}}>
                                </span>
                                     <p className="text-white font-semibold drop-shadow-[0px_2px_2px_rgba(0,0,0,0.9)]">{meta.label}</p>

                             </div>

                             <span className="text-white font-medium">
{total ? ((item.count / total) * 100).toFixed(1) : 0}%                             </span>
                         </div>
                    )
                })}
            </div>



        </main>
    )


}