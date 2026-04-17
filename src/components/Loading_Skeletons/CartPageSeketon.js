import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CartSkeleton() {
  const skeletonProps = {
    baseColor: "#e8e8e8",
    highlightColor: "#f5f5f5",
  };

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 py-6">

      {/* Breadcrumb */}
      <Skeleton height={14} width={150} className="mb-6" {...skeletonProps} />

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ───────── LEFT: CART ITEMS ───────── */}
        <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white">

          {/* Title */}
          <Skeleton height={28} width={180} className="mb-4" {...skeletonProps} />

          {/* Divider */}
          <div className="border-t mb-6" />

          {/* Single Cart Item */}
          <div className="flex gap-6">

            {/* Product Image */}
            <Skeleton
              height={120}
              width={160}
              borderRadius={12}
              {...skeletonProps}
            />

            {/* Details */}
            <div className="flex-1 space-y-3">

              {/* Product Name */}
              <Skeleton height={16} width="80%" {...skeletonProps} />
              <Skeleton height={16} width="60%" {...skeletonProps} />

              {/* Specs */}
              <Skeleton height={14} width="50%" {...skeletonProps} />

              {/* Price */}
              <Skeleton height={14} width="40%" {...skeletonProps} />

              {/* Quantity + Remove */}
              <div className="flex items-center gap-4 mt-2">
                <Skeleton height={35} width={100} borderRadius={20} {...skeletonProps} />
                <Skeleton height={30} width={70} borderRadius={6} {...skeletonProps} />
              </div>
            </div>

            {/* Total Price (right side) */}
            <div className="text-right space-y-2">
              <Skeleton height={14} width={80} {...skeletonProps} />
              <Skeleton height={18} width={100} {...skeletonProps} />
            </div>
          </div>
        </div>

        {/* ───────── RIGHT: ORDER SUMMARY ───────── */}
        <div className="w-full lg:w-80 border border-gray-200 rounded-xl p-6 bg-white space-y-4 h-fit">

          {/* Title */}
          <Skeleton height={22} width="60%" {...skeletonProps} />

          {/* Price Breakdown */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton height={14} width={100} {...skeletonProps} />
              <Skeleton height={14} width={80} {...skeletonProps} />
            </div>
          ))}

          {/* Divider */}
          <div className="border-t my-2" />

          {/* Total */}
          <div className="flex justify-between">
            <Skeleton height={18} width={80} {...skeletonProps} />
            <Skeleton height={18} width={100} {...skeletonProps} />
          </div>

          {/* Buttons */}
          <Skeleton height={45} width="100%" borderRadius={10} {...skeletonProps} />
          <Skeleton height={40} width="100%" borderRadius={10} {...skeletonProps} />
        </div>
      </div>
    </div>
  );
}