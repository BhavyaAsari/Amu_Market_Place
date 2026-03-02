"use client";

import { LuBot } from "react-icons/lu";

export default function AI_Reccomendation ({data}) {

    if(!data) return null;

    const isCompare = data.mode === "compare";

    return (

        <section className="ui-ai-panel">
            <div>
                <div>
                    <LuBot/>
                </div>

                <h2>
                    AI Recommendation
                </h2>
            </div>

            <button>
                Show Detailed Specs
            </button>

            <p>
                explanation

            </p>
        </section>
    )


}