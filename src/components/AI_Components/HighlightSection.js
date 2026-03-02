"use client";

import Image from "next/image";

export default function HighLightSection({ data }) {
  const isCompare = data.mode === "compare";
  const isInsight = data.mode === "insight";

  console.log("AI best score",data.bestScore)

  return (
    <>
      <section className="ui-hilight">
        <div className="ui-hilight-content ui-card">
          <h2 className="hilight-title">
            {isCompare ? "Best Overall" : "Best Fit Analysis"}
          </h2>
          <p className="ui-subtext">
            {isCompare
              ? `${data.summary?.winnerName} stands out based on performance and value.`
              : `This laptop performs best for ${data.bestPurpose}.`}
          </p>
          <div className="flex gap-2 flex-wrap">
            {isCompare &&
              data.summary?.highlights?.map((tag) => (
                <span key={tag} className="ui-tag-success">
                  {tag}
                </span>
              ))}

              {isInsight && (

                <span>
                    AI Score : {data.mach?.toFixed(2)}
                </span>
              )}
          </div>

            {/* Right-Hand Side */}
          <div>
            <Image
            src={isCompare
            ? data.products?.find(p => p.id === data.summary?.winnerId)?.image
            : data.product?.image}
            width={40}
            height={40}
            alt="Product Image" />
          </div>
        </div>
      </section>
    </>
  );
}
