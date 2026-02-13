"use client";

import { useEffect, useState, startTransition } from "react";
import useFilters from "@/libs/useFilter";

const STEP = 1000;
const GAP = 2000;

export default function PriceFilter() {
  const { filters, setFilter } = useFilters();

  const [bounds, setBounds] = useState({ min: 0, max: 0 });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  //  Fetch real price bounds from DB
  useEffect(() => {
    fetch("/api/price-range")
      .then((r) => r.json())
      .then((data) => {
        if (data?.min !== undefined && data?.max !== undefined) {
          setBounds({ min: data.min, max: data.max });
        }
      })
      .catch(() => {
        setBounds({ min: 0, max: 200000 });
      });
  }, []);

  //  Initialize slider values AFTER bounds load
  useEffect(() => {
    if (bounds.max > bounds.min) {
      const urlMin = filters.minPrice
        ? Number(filters.minPrice)
        : bounds.min;

      const urlMax = filters.maxPrice
        ? Number(filters.maxPrice)
        : bounds.max;

      startTransition(() => {
        setMinPrice(urlMin);
        setMaxPrice(urlMax);
      });
    }
  }, [bounds, filters.minPrice, filters.maxPrice]);

  //  Debounce URL updates (remove defaults)
  useEffect(() => {
    if (bounds.max === 0) return;

    const timer = setTimeout(() => {
      setFilter({
        minPrice: minPrice === bounds.min ? null : minPrice,
        maxPrice: maxPrice === bounds.max ? null : maxPrice,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, bounds, setFilter]);

  //  Normalized slider percentages
  const minPercent =
    ((minPrice - bounds.min) / (bounds.max - bounds.min)) * 100;

  const maxPercent =
    ((maxPrice - bounds.min) / (bounds.max - bounds.min)) * 100;

  return (
    <div className="relative w-full mt-8 mb-4">
      <p className="font-semibold text-2xl">Price Range</p>

      <div className="flex justify-between mt-2 mb-2 text-lg font-medium">
        <span>₹{minPrice.toLocaleString("en-IN")}</span>
        <span>₹{maxPrice.toLocaleString("en-IN")}</span>
      </div>

      <div className="relative h-2">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded" />

        {/* Active Range */}
        <div
          className="absolute h-2 bg-purple-600 rounded"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={STEP}
          value={minPrice}
          onChange={(e) =>
            setMinPrice(
              Math.min(Number(e.target.value), maxPrice - GAP)
            )
          }
          className="range-thumb"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={STEP}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(
              Math.max(Number(e.target.value), minPrice + GAP)
            )
          }
          className="range-thumb"
        />
      </div>
    </div>
  );
}
