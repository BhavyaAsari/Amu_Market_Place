"use client";

import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function LocalDropDown({
  label,
  options,
  value,
  onChange,
  rounded = "lg", //  default value

  //  Styling controls
  className = "",
  menuClassName = "",
  optionClassName = "",

  //  Label controls
  labelSize = "md",
  labelClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options?.find((o) => o.value === value);

  //  Rounded mapping
  const roundedClasses = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  //  Label size mapping
  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };
  const labelClass = labelSizeClasses[labelSize] || "text-base";

  const radius = roundedClasses[rounded] || "rounded-lg";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        <label className={`font-semibold mr-2 ${labelClass} ${labelClassName}`}>
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`dropMenu flex items-center justify-between cursor-pointer px-4 py-2 bg-white shadow ${radius} ${className}`}
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
          className={`optnMenu absolute z-10 w-full bg-white shadow-lg mt-2 ${radius} ${menuClassName}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`optnLabel p-2 cursor-pointer hover:bg-purple-100 hover:-translate-y-1 hover:px-6 transition-all ${optionClassName}`}
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
