const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-base-200 rounded-2xl p-4 h-[420px]">
      <div className="h-40 bg-gray-300 rounded-lg"></div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 w-3/4"></div>
        <div className="h-3 bg-gray-300 w-full"></div>
        <div className="h-3 bg-gray-300 w-5/6"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;