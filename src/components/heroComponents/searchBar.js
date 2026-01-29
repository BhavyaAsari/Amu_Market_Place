"use client";

import { BsSearch } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { products } from "@/app/data/products";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const [show, setShow] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const updateURL = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set("q", value) : params.delete("q");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="search-wrapper">
      <label htmlFor="search" className="flex items-center font-bold relative">
        <BsSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500/80 pointer-events-none"
          size={18}
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
          className="search-input"
        />
      </label>

      {show && query && (
        <ul className="search-dropdown">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => {
                  setQuery(product.title);
                  updateURL(product.title);
                  setShow(false);
                  startTransition(() => {
                    router.push(`/products/${product.id}`);
                  });
                }}
                className="px-4 py-2 cursor-pointer hover:bg-purple-100 text-black"
              >
                {product.title}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">
              No products found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
