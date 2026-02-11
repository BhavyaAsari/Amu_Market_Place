"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = Object.fromEntries(searchParams.entries());

  const setFilter = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          params.delete(key);
                

        } else {
          params.set(key, String(value));
        }
      });


      const newUrl = `?${params.toString()}`;
      const currentUrl = `?${searchParams.toString()}`;
      if (newUrl === currentUrl) return;

      router.replace(newUrl);
    },
    [searchParams, router]
  );

  const toggleFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(key)?.split(",") || [];

      if (current.includes(value)) {
        const next = current.filter((v) => v !== value);
        if (next.length === 0) {   //  Fixed typo: lenght → length
          params.delete(key);
        } else {
          params.set(key, next.join(","));
        }
      } else {
        params.set(key, [...current, value].join(","));
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const clearAll = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  return { filters, setFilter, toggleFilter, clearAll };
}