"use client";

import { BsSearch } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation"; // Note: Use next/navigation for App Router
import { useState, useEffect } from "react";
import { products } from "@/app/data/products";
import { useTransition } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  //Transition from searchbar to the product page
  const[isPending,startTransition] = useTransition();

  // 1. Get the current value directly from the URL for every render
  const urlQuery = searchParams.get("q") ?? "";

  // 2. Local state ONLY for what the user is currently typing
  // Initialize it with the URL value
  const [query, setQuery] = useState(urlQuery);
  const [show, setShow] = useState(false);

  // 3. REMOVE the useEffect entirely. 
  // Instead, use "Key-based Resetting" or update state during user interaction.

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const updateURL = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <main className="w-full max-w-lg mt-5 ml-8 relative">
      <label htmlFor="search" className="flex items-center font-bold text-xl relative">
        <BsSearch
          className="text-gray-500/80 absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none"
          size={20}
        />

        <input
          id="search"
          type="text"
          placeholder="Search Laptops..."
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setShow(true);
            updateURL(value);
          }}

        onKeyDown={(e) => {
    if (e.key === "Enter" && filteredProducts.length > 0) {
      router.push(`/products/${filteredProducts[0].slug}`);
    }
  }}
                    
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
          className="w-full pl-10 pr-4 py-2 text-lg text-black/90 bg-white rounded-md border-2 border-black/50 hover:border-black focus:outline-none transition-colors duration-200"
        />
      </label>

      {/* Suggestions Dropdown */}
      {show && query && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id} // Fixed: use product.id
                onClick={() => {
                  setQuery(product.title);
                  updateURL(product.title);
                  setShow(false);
                  startTransition(() => {

                    router.push(`/products/${product.id}`)
                  });

                  
                }}
                className="px-4 py-2 cursor-pointer hover:bg-purple-100 text-black"
              >
                {product.title}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </main>
  );
}