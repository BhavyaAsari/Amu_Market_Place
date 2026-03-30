"use client";

import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

export default function StatsSection({
  statValue,
  statChange,
  totalValue,
  totalLabel
}) {

  const change = Number(statChange) || 0;
  const isIncrease = change >= 0;

  // console.log("statechange",statChange)

  return (
    <main className="flex gap-8 mb-8 relative -top-20">

      <div>
        <p className="statsFont textDropShadow">{statValue}</p>

        <p
          className={`statChangeFont font-semibold flex items-center gap-1 ${
            isIncrease ? "text-green-400" : "text-red-400"
          }`}
        >
          {isIncrease ? <LuTrendingUp /> : <LuTrendingDown />}
          {Math.abs(change).toFixed(2)}%
        </p>
      </div>

      <div>
        <p className="statsFont textDropShadow">{totalValue}</p>
        <p className="statChangeFont font-semibold textDropShadow">{totalLabel}</p>
      </div>

    </main>
  );
}