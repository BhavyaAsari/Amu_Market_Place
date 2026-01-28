import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen p-10 bg-[#0E0B14]">
        <Skeleton
          height={260}
          width="50%"
          borderRadius={12}
          baseColor="#1C1826"
          highlightColor="#2A2340"
          count={10}
          duration={2}
          enableAnimation
        />
      </div>
    </>
  );
}
