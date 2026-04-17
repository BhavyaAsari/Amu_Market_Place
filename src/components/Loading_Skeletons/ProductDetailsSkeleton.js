import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailsLoading() {
  return (
    // outer wrapper matches the white page background in the real UI
    <div className="min-h-screen bg-white px-6 py-10 max-w-7xl mx-auto">

      {/* ── TOP SECTION: image on left, product info on right ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT COL: main product image placeholder
            In the real UI this is a large square image area */}
        <div className="md:col-span-1">
          <Skeleton
            height={340}
            borderRadius={12}
            baseColor="#e8e8e8"
            highlightColor="#f5f5f5"
          />
        </div>

        {/* MIDDLE COL: product title, price, badges, features
            This is the widest section in the real UI */}
        <div className="md:col-span-1 space-y-4">

          {/* product name — two lines because "Samsung Galaxy Book6 Ultra" wraps */}
          <Skeleton height={28} width="90%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          <Skeleton height={28} width="60%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

          {/* tagline: "Power · Performance · Style" */}
          <Skeleton height={16} width="50%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

          {/* price + "Incl. shipping & Taxes" badge */}
          <div className="flex items-center gap-3 mt-2">
            <Skeleton height={30} width={120} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={24} width={160} borderRadius={20} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          </div>

          {/* three info rows: Warranty, Exchange offer, No cost EMI */}
          <div className="space-y-2 mt-2">
            <Skeleton height={16} width="55%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={16} width="50%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={16} width="60%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          </div>

          {/* trust badges row: Free Delivery, Secure Payment, 7-Day Returns */}
          <div className="flex gap-3 mt-4">
            <Skeleton height={32} width={110} borderRadius={20} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={32} width={120} borderRadius={20} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={32} width={100} borderRadius={20} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          </div>

          {/* "Customer Feedback" card with "Write a Review" button */}
          <div className="border border-gray-200 rounded-xl p-4 mt-4 space-y-3">
            <Skeleton height={20} width="50%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={40} width={140} borderRadius={8} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          </div>
        </div>

        {/* RIGHT COL: "System Specs" card
            Sits as a separate white card on the right in the real UI */}
        <div className="md:col-span-1">
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">

            {/* card heading "System Specs" */}
            <Skeleton height={22} width="50%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

            {/* four spec rows — each has an icon + label + value in purple */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton circle height={18} width={18} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                <Skeleton height={16} width="80%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              </div>
            ))}

            {/* divider area then Color, Weight, Battery rows */}
            <div className="pt-2 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton circle height={18} width={18} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                  <Skeleton height={16} width="70%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── REVIEWS SECTION ──
          In the UI this is a wide card that spans the full width below the top grid */}
      <div className="mt-10 border border-gray-200 rounded-xl p-6">

        {/* section heading "Customer Reviews" */}
        <Skeleton height={24} width={200} baseColor="#e8e8e8" highlightColor="#f5f5f5" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          {/* left: aggregate score — "5.0" + stars + rating bars */}
          <div className="space-y-3">
            {/* big score number */}
            <Skeleton height={48} width={100} baseColor="#e8e8e8" highlightColor="#f5f5f5" />

            {/* five rating bar rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton height={12} width={30} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                <Skeleton height={12} width="60%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                <Skeleton height={12} width={30} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              </div>
            ))}
          </div>

          {/* right: individual review card — avatar, name, stars, body text */}
          <div className="md:col-span-2 border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              {/* reviewer avatar circle */}
              <Skeleton circle height={40} width={40} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              <div className="space-y-1">
                {/* reviewer name */}
                <Skeleton height={16} width={120} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                {/* star row */}
                <Skeleton height={14} width={90} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              </div>
            </div>
            {/* review body text — two lines */}
            <Skeleton height={14} width="100%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={14} width="80%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS SECTION ──
          Horizontal scroll row of product cards at the bottom */}
      <div className="mt-10">

        {/* section heading + subtitle */}
        <Skeleton height={24} width={200} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
        <Skeleton height={16} width={260} className="mt-1" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

        {/* five product cards in a row — each has image, name, price, rating, gpu tag */}
        <div className="flex gap-4 mt-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="min-w-40 border border-gray-200 rounded-xl p-3 space-y-2"
            >
              {/* product thumbnail */}
              <Skeleton height={100} borderRadius={8} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              {/* product name — wraps to two lines in the real UI */}
              <Skeleton height={14} width="100%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              <Skeleton height={14} width="70%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              {/* price */}
              <Skeleton height={18} width="60%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              {/* star rating */}
              <Skeleton height={14} width="40%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              {/* GPU tag in purple text */}
              <Skeleton height={12} width="80%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}