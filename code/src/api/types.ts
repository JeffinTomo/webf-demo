export interface ActivityItem {
  'activity-id': string;
  logo: string;
  title: string;
  tx_time: string;
  status: string;
  points: number;
}

export interface MyPointsResponse {
  code: number;
  data: {
    points: number;
    list: ActivityItem[];
    total: number;
    pageSize: number;
    pageNumber: number;
  };
}

export interface ActivitiesResponse {
  code: number;
  data: {
    list: ActivityItem[];
    total: number;
    pageSize: number;
    pageNumber: number;
  };
}

// Request/Response types for referral code API
export interface SetInviteCodeRequest {
  inviteCodeByReferral: string;
}

export interface SetInviteCodeResponse {
  code: number;
  data?: {
    success: boolean;
    message?: string;
  };
  message?: string;
}

// Request/Response types for user info API
export interface GetUserInfoResponse {
  code: number;
  data?: {
    inviteCount?: number;
    friendsReferred?: number;
    pointsEarned?: number;
    [key: string]: unknown;
  };
  message?: string;
}

// Generic API response type
export interface RequestType<T> {
  code: number;
  data?: T;
  message?: string;
}

