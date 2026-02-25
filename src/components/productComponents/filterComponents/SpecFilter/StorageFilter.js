"use client";

import useFilters from "@/libs/useFilter";

// const STORAGE_OPTIONS = ["256GB", "512GB", "1TB"];

export default function StorageFilter({storages=[]}) {
  const { filters, toggleFilter } = useFilters();
  const activeStorage = filters.storage?.split(",") || [];

  return (
    <div className="flex flex-col gap-2  p-2 shadow-xl rounded-2xl">
      {storages.map((storage) => (
        <label
          key={storage}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            className="checkBox"
            checked={activeStorage.includes(storage)}
            onChange={() => toggleFilter("storage", storage)}
          />
          <span className="hoverText">{storage}</span>
        </label>
      ))}
    </div>
  );
}
