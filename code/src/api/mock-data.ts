import type { MyPointsResponse, ActivitiesResponse } from './types';

// Mock data for development
const mockMyPointsData: MyPointsResponse = {
  code: 0,
  data: {
    points: 12345,
    list: [
      {
        'activity-id': '1',
        logo: 'https://via.placeholder.com/40',
        title: '每日签到',
        tx_time: '2024-12-15 10:00:00',
        status: 'completed',
        points: 10,
      },
      {
        'activity-id': '2',
        logo: 'https://via.placeholder.com/40',
        title: '邀请好友',
        tx_time: '2024-12-14 15:30:00',
        status: 'completed',
        points: 100,
      },
      {
        'activity-id': '3',
        logo: 'https://via.placeholder.com/40',
        title: '新用户任务',
        tx_time: '2024-12-13 09:20:00',
        status: 'completed',
        points: 500,
      },
    ],
    total: 234,
    pageSize: 30,
    pageNumber: 0,
  },
};

const mockActivitiesData: ActivitiesResponse = {
  code: 0,
  data: {
    list: [
      {
        'activity-id': '1',
        logo: 'https://via.placeholder.com/40',
        title: '每日签到',
        tx_time: '2024-12-15 10:00:00',
        status: 'available',
        points: 10,
      },
      {
        'activity-id': '2',
        logo: 'https://via.placeholder.com/40',
        title: '邀请好友',
        tx_time: '',
        status: 'available',
        points: 100,
      },
      {
        'activity-id': '3',
        logo: 'https://via.placeholder.com/40',
        title: '新用户任务',
        tx_time: '',
        status: 'available',
        points: 500,
      },
    ],
    total: 24,
    pageSize: 30,
    pageNumber: 0,
  },
};

export { mockMyPointsData, mockActivitiesData };

