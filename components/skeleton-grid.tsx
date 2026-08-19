"use client";

export function SkeletonGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <div className="w-48 h-6 shimmer rounded" />
        <div className="flex gap-4">
          <div className="w-24 h-8 shimmer rounded-full" />
          <div className="w-24 h-8 shimmer rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[1.6/1] w-full shimmer rounded-2xl" />
            <div className="space-y-2">
              <div className="w-3/4 h-4 shimmer rounded" />
              <div className="w-1/2 h-3 shimmer rounded" />
              <div className="w-1/4 h-3 shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
