"use client";

import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

export default function LocalDropDown({
  label,
  options,
  value,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(o => o.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <section
      ref={dropdownRef}
      className="customDropDown relative"
    >

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
              className="optnLabel p-2 hover:bg-purple-100 cursor-pointer hover:-translate-y-1 hover:px-6 hover-effect"
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