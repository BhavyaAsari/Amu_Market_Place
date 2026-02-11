"use client";

import { useEffect, useState ,startTransition} from "react";
import useFilters from "@/libs/useFilter";

const MIN = 0;
const MAX = 200000;
const STEP = 1000;
const GAP = 2000;

export default function PriceFilter() {
  const { filters, setFilter } = useFilters();

  const [minPrice, setMinPrice] = useState(() =>
    filters.minPrice ? Number(filters.minPrice) : MIN
  );

  const [maxPrice, setMaxPrice] = useState(() =>
    filters.maxPrice ? Number(filters.maxPrice) : MAX
  );

  const [bounds, setBounds] = useState({ min: MIN, max: MAX });

  //  Fix #4 — Fetch real price bounds from DB
  useEffect(() => {
    fetch("/api/price-range")
      .then((r) => r.json())
      .then((data) => {
        if (data?.min !== undefined && data?.max !== undefined) {
          setBounds({ min: data.min, max: data.max });
        }
      })
      .catch(() => {
        // silently fall back to constants if API fails
        setBounds({ min: MIN, max: MAX });
      });
  }, []);

  //  Fix #2 & #5 — Sync slider state when URL changes (back/forward + clearAll)
  // Replace the URL sync useEffect with this
useEffect(() => {
  const urlMin = filters.minPrice ? Number(filters.minPrice) : MIN;
  const urlMax = filters.maxPrice ? Number(filters.maxPrice) : MAX;

  // Batch both updates together — avoids synchronous cascading renders
  startTransition(() => {
    setMinPrice(urlMin);
    setMaxPrice(urlMax);
  });
}, [filters.minPrice, filters.maxPrice]);

  //  Fix #3 — Debounce URL update, remove defaults from URL
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter({
        minPrice: minPrice === MIN ? null : minPrice,
        maxPrice: maxPrice === MAX ? null : maxPrice,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, setFilter]);

  return (
    <div className="relative w-full mt-8 mb-4">
      <p className="font-semibold text-2xl">Price Range</p>

      <div className="flex justify-between mt-2 mb-2 text-lg font-medium">
        <span>₹{minPrice.toLocaleString("en-IN")}</span>
        <span>₹{maxPrice.toLocaleString("en-IN")}</span>
      </div>

      {/* Slider container */}
      <div className="relative h-2">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded" />

        {/* Active range */}
        <div
          className="absolute h-2 bg-purple-600 rounded"
          style={{
            left: `${(minPrice / bounds.max) * 100}%`,
            right: `${100 - (maxPrice / bounds.max) * 100}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={STEP}
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(+e.target.value, maxPrice - GAP))
          }
          className="range-thumb"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={STEP}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(+e.target.value, minPrice + GAP))
          }
          className="range-thumb"
        />
      </div>

      {/* ✅ Show warning if no products likely in range */}
      {minPrice >= bounds.max && (
        <p className="text-sm text-red-500 mt-2">
          Min price exceeds available range
        </p>
      )}
    </div>
  );
}