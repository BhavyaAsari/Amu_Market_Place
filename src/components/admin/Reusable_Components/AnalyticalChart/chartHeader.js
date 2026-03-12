export default function ChartHeader({ title, subtitle }) {


    return (

        <main className="mb-8">
            <div className="HeaderContainer">
                <div className="titleContainer ">
                    {/* <span className="text-[22px] tracking-[0.2em] uppercase text-violet-500 font-mono">Analytics</span> */}
              
                </div>

                <h2 className="text-2xl font-extrabold text-white">
                      {title}
                </h2>

                <p className="text-sm text-gray-800 mt-3 font-bold">{subtitle}</p>

            </div>
        </main>
    )
}