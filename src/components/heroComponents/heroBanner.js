"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <section
      className="banner"
  style={{
  background: `
    radial-gradient(circle at 75% 50%, rgba(143,103,214,0.35), transparent 45%),
    radial-gradient(circle at 85% 60%, rgba(255,255,255,0.25), transparent 20%),
    linear-gradient(90deg,#f4f3f8 0%,#e8e2f3 40%,#c9b6ea 70%,#8f67d6 100%)
  `
}}>
        <div className="hero-bg"></div>
      <div className="layout-container layout-hero">

        {/* LEFT CONTENT */}
        <div className="max-w-lg">

          <h1 className="hero-title">
            Find Your Perfect Laptop.
          </h1>

          <p className="hero-subtitle">
            Performance. Power. Precision.
          </p>

          <p className="hero-desc">
            Explore our curated collection of premium laptops tailored
            to meet your needs.
          </p>

          <div className="hero-cta">

            <button className="hero-btn-primary">
              Shop Now
            </button>

            <button className="hero-btn-secondary">
              Explore Deals
            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">

          <Image
            src="/herobanner1.png"
            alt="Laptop showcase"
            fill
            className="object-contain scale-200"
            priority
          />

        </div>

      </div>
    </section>
  );
}