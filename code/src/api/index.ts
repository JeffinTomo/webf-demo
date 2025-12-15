import axios from 'axios';
import type { MyPointsResponse, ActivitiesResponse } from './types';
import { apiCache } from './cache';
import { mockMyPointsData, mockActivitiesData } from './mock-data';

const baseUrl = 'https://wlfi.com/test/api/points';

// Create axios instance
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// Helper function to get cached or fetch data
async function getCachedOrFetch<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  expiry?: number
): Promise<T> {
  // Check cache first
  const cached = apiCache.get<T>(cacheKey);
  if (cached !== null) {
    return cached;
  }

  // Fetch from API (or mock in development)
  try {
    const data = await fetchFn();
    apiCache.set(cacheKey, data, expiry);
    return data;
  } catch (error) {
    // Fallback to mock data in development
    console.warn('API request failed, using mock data:', error);
    if (cacheKey === 'mypoints') {
      return mockMyPointsData as T;
    }
    if (cacheKey === 'activities') {
      return mockActivitiesData as T;
    }
    throw error;
  }
}

export const apiService = {
  // A01: Get my points
  async getMyPoints(): Promise<MyPointsResponse> {
    return getCachedOrFetch<MyPointsResponse>(
      'mypoints',
      async () => {
        const response = await apiClient.get<MyPointsResponse>('/mypoints');
        return response.data;
      },
      5 * 60 * 1000 // 5 minutes cache
    );
  },

  // A02: Get activities
  async getActivities(): Promise<ActivitiesResponse> {
    return getCachedOrFetch<ActivitiesResponse>(
      'activities',
      async () => {
        const response = await apiClient.get<ActivitiesResponse>('/activities');
        return response.data;
      },
      5 * 60 * 1000 // 5 minutes cache
    );
  },
};

