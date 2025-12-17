import { useEffect, useState } from 'react';
import { apiService } from '../../api';
import type { MyPointsResponse } from '../../api/types';
import MyPoints from '../../components/my-points';
import InviteFriends from '../../components/invite-friends';
import NewUserRequest from '../../components/new-user-request';
import DailyRequest from '../../components/daily-request';
import Activities from '../../components/activities';
import { WebFListView } from '../../components/webf-listview';

/**
 * design figma link: https://www.figma.com/design/YvaX5joHmqZfcFSsHobQ4W/NEW--WLFI-App?node-id=28824-42024&t=6IxeoGDPoZ08pa6k-0
 */
export default function HomePage() {
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

  const handleRefresh = () => {
    console.log('Refreshing home page...');
    loadData();
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  return (
    <WebFListView
      onRefresh={handleRefresh}
      refresh-style="customCupertino"
      style={{
        minHeight: '100vh',
        paddingBottom: '100px'
      }}
    >
      <div className="max-w-md mx-auto pb-8 pt-4">
        {myPointsData && (
          <>
            <MyPoints
              points={myPointsData.data.points}
            />
            <InviteFriends />
            <NewUserRequest />
            <DailyRequest />
            <Activities />
          </>
        )}
      </div>
    </WebFListView>
  );
}

