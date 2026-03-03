"use client";
import { useState } from "react";
import ProductListCard from "./productListCard";
import CompareTextButton from "../AI_Components/CompareButton";
// import { products } from "@/app/data/products";


export default function ProductListClient ({laptops}) {

const [selectedProducts, setSelectedProducts] = useState([]);

   const toggleProduct = (productId) => {
  setSelectedProducts(prev => {
    if (prev.includes(productId)) {
      return prev.filter(id => id !== productId);
    } else {
      if (prev.length >= 3) {
        alert("Maximum 3 laptops allowed");
        return prev;
      }
      return [...prev, productId];
    }
  });
};
    return (

        <>

<CompareTextButton selectedProducts={selectedProducts}  />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {laptops.map((laptop) => (
        <ProductListCard
          key={laptop._id}
          product={laptop}
          selectedProducts={selectedProducts}
          toggleProduct={toggleProduct}
        />
      ))}
    </div>

        </>
    )
}

