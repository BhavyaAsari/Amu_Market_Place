"use client";

import Image from "next/image";

export default function HighLightSection({ data }) {
  const isCompare = data.mode === "compare";
  const isInsight = data.mode === "insight";

  const imageSrc = isCompare
    ? data.products?.find(p => p.id === data.summary?.winnerId)?.image
    : data.product?.image;


  return (
    <section className="ui-hilight">
      <div className="ui-hilight-content ui-card flex justify-between items-center gap-6 p-6">

        {/* LEFT SIDE CONTENT */}
        <div className="flex-1">
          <h2 className="hilight-title text-xl font-semibold">
            {isCompare ? "Best Overall" : "Best Fit Analysis"}
          </h2>

          <p className="ui-subtext leading-loose mt-2">
            {isCompare
              ? `${data.summary?.winnerName} stands out based on performance and value.`
              : `This laptop performs best for ${data.bestPurpose}.`}
          </p>

          <div className="flex gap-2 flex-wrap mt-3">
            {isCompare &&
              data.summary?.highlights?.map((tag) => (
                <span key={tag} className="ui-tag-success">
                  {tag}
                </span>
              ))}

            {isInsight && (
              <span className="text-purple-400 font-medium">
AI Score: {data.bestScore?.toFixed(2)}              </span>
            )}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        {imageSrc && (
          <div className="relative w-40 h-40 shrink-0">
            <Image
              src={imageSrc}
              alt="Product Image"
              fill
              className="object-contain"
            />
          </div>
        )}

      </div>
    </section>
  );
}