import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../api';
import type { MyPointsResponse } from '../../api/types';
import MyPoints from '../../components/my-points';
import InviteFriends from '../../components/invite-friends';
import NewUserRequest from '../../components/new-user-request';
import DailyRequest from '../../components/daily-request';

/**
 * design figma link: https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App?node-id=28824-42024&t=6IxeoGDPoZ08pa6k-0
 */
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
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-[100px]">
      <div className="max-w-md mx-auto min-h-screen pb-8 pt-4">
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

