export function SkeletonLoader() {
  return [...Array(10)].map((_, index) => (
    <div
      key={index}
      className="mx-auto h-22 w-[380px] animate-pulse rounded-2xl bg-gray-900 px-3 py-2 text-gray-100 shadow-lg"
    />
  ));
}
