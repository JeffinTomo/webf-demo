import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import PointsRecordsPage from '../pages/points-records';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/points-records',
    element: <PointsRecordsPage />,
  },
]);

