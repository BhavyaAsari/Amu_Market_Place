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

  const isLoading = !data.explanation;

  return (
    <section className="ui-ai-panel ui-card">
      <div>
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 relative">
              <Image
                src="/robo_icon.png"
                alt="robo_icon"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="text-4xl font-semibold text-purple-400">
              AI Recommendation
            </h2>
          </div>

          {/* Toggle appears if explanation exists */}
          {data.explanation && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Detailed View
              </span>

              <button
                onClick={() => setShowFull((prev) => !prev)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300
                ${showFull ? "bg-purple-600" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full
                  transition-transform duration-300
                  ${showFull ? "translate-x-6" : ""}`}
                />
              </button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="relative">
          {isLoading && (
            <p className="animate-pulse text-gray-500">
              🧠 Generating AI explanation...
            </p>
          )}

          {data.explanation && (
            <div
              className={`relative overflow-hidden transition-all duration-500 ease-in-out
              ${showFull ? "max-h-300" : "max-h-48"}`}
            >
              <div
                className="whitespace-pre-line leading-relaxed
                bg-white/70 backdrop-blur-sm
                border border-gray-200
                rounded-xl p-6 shadow-sm"
              >
                {data.explanation}
              </div>

              {/* Fade overlay when collapsed */}
              {!showFull && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-16
                  bg-lineart-to-t from-white to-transparent pointer-events-none"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}