export default function GameCardSkeleton({ className = "" }) {
  return (
    <div className={`relative rounded-xl bg-slate-900/40 border border-white/5 overflow-hidden backdrop-blur-sm shadow-lg animate-pulse ${className}`}>
      {/* Box Art Skeleton */}
      <div className="relative aspect-[3/4] bg-slate-800">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent shimmer"></div>
      </div>

      {/* Meta Skeleton */}
      <div className="p-4 absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent pt-12">
        {/* Title skeleton */}
        <div className="h-5 bg-slate-700 rounded w-3/4 mb-2"></div>

        {/* Meta info skeleton */}
        <div className="flex justify-between mt-1">
          <div className="h-3 bg-slate-700 rounded w-12"></div>
          <div className="h-3 bg-slate-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
