import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../api';
import type { MyPointsResponse } from '../../api/types';
import MyPoints from '../../components/my-points';
import InviteFriends from '../../components/invite-friends';
import NewUserRequest from '../../components/new-user-request';
import DailyRequest from '../../components/daily-request';

export default function HomePage() {
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
      console.error('Failed to load my points:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePointsClick = () => {
    navigate('/points-records');
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
        {myPointsData && (
          <>
            <MyPoints
              points={myPointsData.data.points}
              onClick={handlePointsClick}
            />
            <InviteFriends />
            <NewUserRequest />
            <DailyRequest />
          </>
        )}
      </div>
    </div>
  );
}

