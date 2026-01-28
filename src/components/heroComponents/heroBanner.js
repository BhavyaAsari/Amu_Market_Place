import Image from "next/image";

export default function HeroBanner() {
  return (
    <main
      className="
        banner
        p-10
        flex
        justify-between
        items-start
        gap-10
      "
      style={{
        background:
          "linear-gradient(to right, #eef0f3 0%, #f3e8ff 45%, #7c3aed 100%)",
      }}
    >
      {/* LEFT CONTENT */}
      <section className="max-w-xl">
        <h1 className="font-bold mb-4 text-5xl">
          AMU TECH FEST ~26
        </h1>

        <p className="mb-6 text-2xl text-gray-700">
          Smarter choices for all
        </p>

        <ul className="text-lg list-disc ml-5 space-y-3 text-gray-800">
          <li>Compare smarter. Buy better.</li>
          <li>Find the best specs for your budget.</li>
          <li>Grab exclusive deals in one place.</li>
        </ul>
      </section>

      {/* RIGHT IMAGE */}
      <section className="flex items-center justify-center">
        <div className="relative w-100 h-100  ">
          <Image
            src="/herobanner.png"
            alt="Hero illustration showing laptop comparison"
            fill
            className="object-fill -mt-10 bg-blend-normal "
            quality={100}
            priority
          />
        </div>
      </section>
    </main>
  );
}
