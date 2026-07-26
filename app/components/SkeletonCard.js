export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-zinc-800 h-48 rounded-xl"></div>

      <div className="mt-3 h-4 bg-zinc-800 rounded"></div>

      <div className="mt-2 h-4 w-2/3 bg-zinc-800 rounded"></div>
    </div>
  );
}