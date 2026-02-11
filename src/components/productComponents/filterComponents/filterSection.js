"use client";

import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

export default function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full border-b pb-3 ">
      {/* Header */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        className="
          w-full
          flex
          text-xl
          items-center
          justify-between
          text-left
          font-medium
          tracking-wide
          hover:text-purple-600
          hover:cursor-pointer
          
        "
      >
        <span className="mt-6">{title}</span>
        {open ? <LuChevronDown size={18} /> : <LuChevronRight size={18} />}
      </button>

      {/* Content */}
      {open && (
        <div className="mt-3 space-y-2 pl-1">
          {children}
        </div>
      )}
    </div>
  );
}
