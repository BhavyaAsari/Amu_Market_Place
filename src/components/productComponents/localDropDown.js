"use client";

import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function LocalDropDown({
  label,
  options,
  value,
  onChange,
  rounded = "lg", //  default value
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options?.find((o) => o.value === value );

  //  Rounded mapping
  const roundedClasses = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const radius = roundedClasses[rounded] || "rounded-lg";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section ref={dropdownRef} className="customDropDown relative">
      
      {label && (
        <label className="font-semibold text-lg mr-2">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`dropMenu flex items-center justify-between cursor-pointer px-4 py-2 bg-white shadow ${radius}`}
      >
        {selectedOption?.label || "Select"}

        <LuChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Options */}
      {isOpen && (
        <div
          className={`optnMenu absolute z-10 w-full bg-white shadow-lg mt-2 ${radius}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="optnLabel p-2 hover:bg-purple-100 cursor-pointer hover:-translate-y-1 hover:px-6 transition-all"
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