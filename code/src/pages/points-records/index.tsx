import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../api';
import type { MyPointsResponse, ActivityItem } from '../../api/types';

export default function PointsRecordsPage() {
  const navigate = useNavigate();
  const [myPointsData, setMyPointsData] = useState<MyPointsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getMyPoints();
      setMyPointsData(data);
    } catch (error) {
      console.error('Failed to load points records:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Points Records</h1>
        </div>

        {/* Points Summary */}
        {myPointsData && (
          <div className="px-4 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="text-sm opacity-90">Total Points</div>
            <div className="text-3xl font-bold mt-1">{myPointsData.data.points.toLocaleString()}</div>
          </div>
        )}

        {/* Records List */}
        <div className="px-4 py-4">
          {myPointsData?.data.list && myPointsData.data.list.length > 0 ? (
            <div className="space-y-3">
              {myPointsData.data.list.map((item: ActivityItem) => (
                <div
                  key={item['activity-id']}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {item.tx_time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      +{item.points}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 capitalize">
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No records yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

