"use client";

import Image from "next/image";

export default function ProductComparisonGrid({ data }) {

  if (!data?.products) return null;

  // console.log("product",data.products.image)

  return (
    <section>

      <div className="ui-compareLayout ui-card">

        {data.products.map(product => (

          <div key={product.id} className="ui-compareProduct ">

            {/* Score Badge */}
            {product.finalScore && (
              <div className="ui-score">
                {product.finalScore.toFixed(1)}
              </div>
            )}

            {/* Title + Rating */}
            <div>
              <h3 className="ui-product-title line-clamp-1">
                {product.name}
              </h3>
              <p className="ui-rating">
                ⭐ {product.rating}
              </p>
            </div>

            {/* Specs */}
            <ul className="ui-spec-list">
              {product.keySpecs?.map(spec => (
                <li key={spec}>✔ {spec}</li>
              ))}
            </ul>

            {/* Image */}
            <div className="relative h-20 w-40">
               <Image
              src={product.image}
              alt={product.brand}
              fill
              className=" object-contain "
            />
            </div>

            {/* Price */}
            <div>
              <div className="ui-price">
                ₹{product.price}
              </div>
            </div>

            {/* CTA */}
            <button className="ui-btn-primary">
              View Laptop
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}