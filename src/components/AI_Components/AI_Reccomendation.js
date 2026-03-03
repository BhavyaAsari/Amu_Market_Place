"use client";

import Image from "next/image";
import { useState } from "react";

export default function AI_Reccomendation({ data }) {
  const [showFull, setShowFull] = useState(false);

  if (!data) {
    return (
      <p className="text-center text-lg animate-pulse py-10">
        🧠 Generating AI enhanced explanation...
      </p>
    );
  }

  const isCompare = data.mode === "compare";
  const isExplanationLoading = isCompare && !data.explanation;

  const previewText =
    data.explanation?.length > 300
      ? data.explanation.substring(0, 270) + "..."
      : data.explanation;

  return (
    <section className="ui-ai-panel ui-card ">
      <div className="">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 relative">
              <Image
                src="/robo_icon.png"
                alt="robo_Icon"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="text-4xl font-semibold text-purple-400">
              AI Recommendation
            </h2>
          </div>

          {isCompare && data.explanation && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Show Detailed Explanation
              </span>

              <button
                onClick={() => setShowFull(prev => !prev)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300
                  ${showFull ? "bg-purple-600" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full
                    transition-transform duration-300
                    ${showFull ? "translate-x-5" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
{!showFull && (
  <div className="absolute bottom-0 left-0 right-0 h-10 
    bg-linear-to-t from-white to-transparent pointer-events-none" />
)}
        {/* CONTENT */}
        <div className="relative">

          {isCompare && isExplanationLoading && (
            <p className="animate-pulse text-gray-500">
              🧠 Generating AI explanation...
            </p>
          )}

          {isCompare && data.explanation && (
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out
                ${showFull ? "max-h-500" : "max-h-40"}`}
            >
              <div
                className="whitespace-pre-line leading-relaxed 
                           bg-white/70 
                           backdrop-blur-sm 
                           border border-gray-200 
                           rounded-xl 
                           p-6 
                           shadow-sm"
              >
                {showFull ? data.explanation : previewText}
              </div>
            </div>
          )}

          {!isCompare && (
            <div
              className="whitespace-pre-line leading-relaxed 
                         bg-white/70 
                         border border-gray-200 
                         rounded-xl 
                         p-6 
                         shadow-sm"
            >
              🏆 Best Use Case  
              • This laptop performs best for {data.bestPurpose}  
              • Optimized for workloads aligned with this purpose  

              {"\n\n"}

              🎯 Recommendation  
              • Ideal choice if your primary focus is {data.bestPurpose}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}