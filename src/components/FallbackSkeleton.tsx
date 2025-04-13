import { Skeleton } from "./ui/skeleton";

interface skeletonProps {
  className?: string;
}

function FallbackSkeleton({ className }: skeletonProps) {
  return (
    <div className={`space-y-2 p-2 ${className}`}>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export default FallbackSkeleton;
