interface MyPointsProps {
  points: number;
  onClick?: () => void;
}

export default function MyPoints({ points, onClick }: MyPointsProps) {
  return (
    <div
      className="px-4 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm opacity-90">My Points</div>
          <div className="text-3xl font-bold mt-1">{points.toLocaleString()}</div>
        </div>
        <div className="text-white opacity-80">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

