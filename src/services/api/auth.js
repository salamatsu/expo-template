import { POSTS_LIMIT } from "../../constants";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { axiosAuth } from "./axios";

export const requestApi = async (payload) => {
  try {
    const result = await axiosAuth.post("/api/v1/auth/pin/request", payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const validateApi = async (payload) => {
  try {
    const result = await axiosAuth.post("/api/v1/auth/pin/validate", payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};
export const getPostsApi = async ({ page = 1, limit = POSTS_LIMIT }) => {
  const { userInfo } = useUserAuthStore.getState();

  try {
    const result = await axiosAuth.get(
      `/api/auth/getPosts?userId=${userInfo?.userId}&page=${page}&limit=${limit}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};


export const getMediaFilesApi = async (payload) => {
  try {
    const result = await axiosAuth.get("/api/auth/getMediaFiles?postId=" + payload);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const staticLinksApi = async () => {
  try {
    const result = await axiosAuth.get(
      "https://register.iiee3expo2024.com/staticLinks"
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
