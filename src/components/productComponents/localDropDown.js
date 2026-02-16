"use client";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function LocalDropDown({
  label,
  options,
  value,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(o => o.value === value);

  return (
    <section className="customDropDown relative">

      <label className="font-semibold text-lg mr-2">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="dropMenu flex items-center justify-between cursor-pointer"
      >
        {selectedOption?.label || "Select"}

        <LuChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="optnMenu absolute z-10 w-full bg-white shadow-lg mt-2 rounded-md">
          {options.map((option) => (
            <div
              key={option.value}
              className="optnLabel p-2 hover:bg-purple-100 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
