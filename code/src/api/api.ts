import axios from "axios";
import type { SetInviteCodeRequest, SetInviteCodeResponse, GetUserInfoResponse, RequestType, GetInviteInfoResponse } from "./types";

const envs = {
  dev: {
    baseURL: "https://idc-new-wallet.tomo.services",
    timeout: 20000,
  },
  prod: {
    baseURL: "https://idc-new-wallet.tomo.services",
    timeout: 2000,
  }
};

const env = "dev";
export const config = envs[env] || envs.dev;

export const metayReq = axios.create(config);

// Request interceptor for adding auth token
[metayReq].forEach((apiItem) => {
  apiItem.interceptors.request.use(
    async (config) => {
      config.headers["Content-Type"] = "application/json";
      // TODO: Add getUserInfo() function to get token
      // const { token = "" } = getUserInfo();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      if (error?.response?.status === 401) {
        return Promise.reject({
          message: error?.response?.data?.message
        });
      }
      return Promise.reject(error);
    },
  );
  
  // Response interceptor
  apiItem.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject({
        message: error?.response?.data
      });
    },
  );
});

export const userAPIs = {
  // Set referral code
  setInviteCode: async (params: SetInviteCodeRequest): Promise<RequestType<SetInviteCodeResponse["data"]> | null> => {
    try {
      const res = await metayReq.put(`/api/project/wlfi/reward/wallet/invite-code`, params);
      return res.data;
    } catch (err) {
      console.error("setInviteCode failed: ", err);
      return err as RequestType<SetInviteCodeResponse["data"]> | null;
    }
  },

  getInviteInfo: async (): Promise<RequestType<GetInviteInfoResponse["data"]> | null> => {
    try {
      const res = await metayReq.get(`/api/project/wlfi/reward/wallet/info`);
      return res.data;
    } catch (err) {
      console.error("getInviteInfo failed: ", err);
      return err as RequestType<GetInviteInfoResponse["data"]> | null;
    }
  },

  // Get user info (including invite count)
  getUserInfo: async (): Promise<RequestType<GetUserInfoResponse["data"]> | null> => {
    try {
      const res = await metayReq.get(`/api/project/wlfi/reward/wallet/referral`);
      return res.data;
    } catch (err) {
      console.error("getUserInfo failed: ", err);
      return err as RequestType<GetUserInfoResponse["data"]> | null;
    }
  },
};

