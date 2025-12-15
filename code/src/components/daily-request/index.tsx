import { useEffect, useState } from 'react';
import { apiService } from '../../api';
import type { ActivityItem } from '../../api/types';

export default function DailyRequest() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await apiService.getActivities();
      // Filter for today's available activities
      // In a real app, you would filter by date and availability
      const todayActivities = data.data.list.filter(
        (activity) => activity.status === 'available' &&
          !activity.title.toLowerCase().includes('new user') &&
          !activity.title.toLowerCase().includes('新用户')
      );
      setActivities(todayActivities);
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityClick = (activity: ActivityItem) => {
    // Handle activity action
    console.log('Activity clicked:', activity);
    // In a real app, this would trigger the activity completion flow
  };

  if (loading) {
    return (
      <div className="px-4 py-6 bg-white">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="px-4 py-6 bg-white">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Daily Request</h2>
          <p className="text-sm text-gray-500 mt-1">Today's available activities</p>
        </div>
        <div className="text-center py-8 text-gray-500">
          No activities available today
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 bg-white">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Daily Request</h2>
        <p className="text-sm text-gray-500 mt-1">Today's available activities</p>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity['activity-id']}
            onClick={() => handleActivityClick(activity)}
            className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <img
              src={activity.logo}
              alt={activity.title}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">{activity.title}</div>
              <div className="text-sm text-gray-500 mt-1">
                Status: {activity.status}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">
                +{activity.points}
              </div>
              <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                {activity.status === 'available' ? 'Start' : 'View'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

