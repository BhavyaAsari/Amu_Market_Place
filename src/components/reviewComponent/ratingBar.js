import { FaStar } from "react-icons/fa";

export default function RatingsBar({ star, percent }) {

  const safeStar = Number(star) || 0;
  const safePercent = Number(percent) || 0;

  return (
    <div className="flex items-center w-full gap-4">

      <span className="w-6 text-purple-700 font-semibold text-lg">
        {safeStar}
      </span>

      <div className="flex gap-1 w-28 text-sm">
        {[...Array(safeStar)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>

      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: `${safePercent}%` }}
          className="h-full bg-purple-500 transition-all duration-500"
        />
      </div>

      <span className="w-10 text-sm text-gray-700">
        {safePercent}%
      </span>

    </div>
  );
}
