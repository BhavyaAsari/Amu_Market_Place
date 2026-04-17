import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AdminDashboardSkeleton() {
  const skeletonProps = {
    baseColor: "#6D28D9",       // purple base
    highlightColor: "#8B5CF6",  // lighter purple shimmer
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ───────── SIDEBAR ───────── */}
      <div className="w-64 bg-linear-to-b from-purple-700 to-purple-900 p-4 space-y-6">
        <Skeleton height={30} width="80%" {...skeletonProps} />

        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={40} borderRadius={10} {...skeletonProps} />
        ))}
      </div>

      {/* ───────── MAIN CONTENT ───────── */}
      <div className="flex-1 p-6 space-y-6">

        {/* Title */}
        <Skeleton height={30} width={250} baseColor="#e5e7eb" highlightColor="#f3f4f6" />

        {/* ───── INSIGHTS CARDS ───── */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-linear-to-r from-purple-600 to-purple-800"
            >
              <Skeleton height={14} width="50%" {...skeletonProps} />
              <Skeleton height={24} width="70%" className="mt-2" {...skeletonProps} />
            </div>
          ))}
        </div>

        {/* ───── REVENUE GRAPH CARD ───── */}
        <div className="p-6 rounded-xl bg-linear-to-r from-purple-600 to-purple-800 space-y-4">
          
          <div className="flex justify-between">
            <Skeleton height={20} width={200} {...skeletonProps} />
            <Skeleton height={35} width={120} borderRadius={8} {...skeletonProps} />
          </div>

          {/* Graph area */}
          <Skeleton height={200} borderRadius={12} {...skeletonProps} />
        </div>

        {/* ───── PRICE BREAKDOWN ───── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Donut chart */}
          <div className="col-span-2 p-6 rounded-xl bg-linear-to-r from-purple-600 to-purple-800">
            <Skeleton height={200} borderRadius={100} {...skeletonProps} />
          </div>

          {/* Insights cards */}
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-linear-to-r from-purple-600 to-purple-800"
              >
                <Skeleton height={16} width="80%" {...skeletonProps} />
                <Skeleton height={12} width="100%" className="mt-2" {...skeletonProps} />
                <Skeleton height={12} width="90%" {...skeletonProps} />
              </div>
            ))}
          </div>
        </div>

        {/* ───── TOP BRANDS BAR CHART ───── */}
        <div className="p-6 rounded-xl bg-linear-to-r from-purple-600 to-purple-800 space-y-4">

          <Skeleton height={20} width={250} {...skeletonProps} />

          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={20} width={`${80 - i * 10}%`} borderRadius={10} {...skeletonProps} />
          ))}
        </div>
      </div>
    </div>
  );
}