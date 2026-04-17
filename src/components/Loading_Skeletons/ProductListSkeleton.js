import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductListLoading() {
  return (
    // full page white background, same as the real product list page
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 py-6">

      {/* breadcrumb line at the top — "Home / Products" etc */}
      <Skeleton height={14} width={180} baseColor="#e8e8e8" highlightColor="#f5f5f5" className="mb-4" />

      <div className="flex gap-6">

        {/* ── LEFT: SIDEBAR FILTER PANEL ──
            In the real UI this is a fixed-width column with
            brand checkboxes, price slider, RAM filter, etc. */}
        <div className="w-55 shrink-0 space-y-5">

          {/* "Laptop Filter" heading at top of sidebar */}
          <Skeleton height={20} width="70%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

          {/* each filter group: a label + 4-5 checkbox rows */}
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <div key={groupIndex} className="space-y-2">

              {/* filter group label e.g. "Brand", "RAM", "Price" */}
              <Skeleton height={16} width="50%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

              {/* checkbox + label rows inside the group */}
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-2">
                  <Skeleton height={14} width={14} borderRadius={3} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                  <Skeleton height={13} width={`${60 + rowIndex * 8}%`} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                </div>
              ))}
            </div>
          ))}

          {/* price range slider placeholder */}
          <div className="space-y-2">
            <Skeleton height={16} width="40%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            <Skeleton height={8} width="100%" borderRadius={4} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            {/* min / max labels below slider */}
            <div className="flex justify-between">
              <Skeleton height={12} width={50} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              <Skeleton height={12} width={50} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
            </div>
          </div>
        </div>

        {/* ── RIGHT: PRODUCT GRID ──
            Real UI shows 2 cards per row on a normal screen,
            each card has: image, product name, short specs line,
            price in purple, star rating, GPU tag at the bottom */}
        <div className="flex-1">

          {/* sort dropdown row sits above the grid on the right side */}
          <div className="flex justify-end mb-4">
            <Skeleton height={36} width={160} borderRadius={8} baseColor="#e8e8e8" highlightColor="#f5f5f5" />
          </div>

          {/* the grid itself — 2 columns matching the real layout */}
          <div className="grid grid-cols-2 gap-4">

            {/* render 12 card skeletons — enough to fill the visible viewport
                without making the page feel endless */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white"
              >
                {/* product image — rectangular, sits at the top of each card */}
                <Skeleton
                  height={160}
                  borderRadius={8}
                  baseColor="#e8e8e8"
                  highlightColor="#f5f5f5"
                />

                {/* product name — wraps to 2 lines in the real cards */}
                <Skeleton height={15} width="100%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
                <Skeleton height={15} width="75%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

                {/* short specs line below the name e.g. "16GB / 512GB SSD" */}
                <Skeleton height={13} width="60%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

                {/* price in purple — wider than the spec line */}
                <Skeleton height={18} width="45%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

                {/* star rating row */}
                <Skeleton height={13} width="35%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />

                {/* GPU tag at the bottom — shown in purple text in the real UI */}
                <Skeleton height={12} width="70%" baseColor="#e8e8e8" highlightColor="#f5f5f5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}