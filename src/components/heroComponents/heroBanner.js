import Image from "next/image";

export default function HeroBanner() {
  return (
    <section
      className="banner"
      style={{
        background:
          "linear-gradient(to right, #eef0f3 0%, #f3e8ff 45%, #7c3aed 100%)",
      }}
    >
      <div className="layout-container layout-hero">

        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <h1 className="hero-title">
            AMU TECH FEST ~26
          </h1>

          <p className="hero-subtitle">
            Smarter choices for all
          </p>

          <ul className="hero-list">
            <li>Compare smarter. Buy better.</li>
            <li>Find the best specs for your budget.</li>
            <li>Grab exclusive deals in one place.</li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <Image
            src="/herobanner.png"
            alt="Hero illustration showing laptop comparison"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>

      </div>
    </section>
  );
}
