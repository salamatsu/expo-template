import { COMMENTS_LIMIT } from "../../constants";
import { objectToQueryParams } from "../../utils/arrObjectFormats";
import { createAxiosInstanceWithInterceptor } from "./axios";

const axiosDefault = createAxiosInstanceWithInterceptor("data", "USER");
const axiosMultipart = createAxiosInstanceWithInterceptor("multipart", "USER");

export const exhibitorScanApi = async (payload) => {
  try {
    const result = await axiosDefault.post(
      `/api/v1/app/scans/exhibitor/scan`,
      payload
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const scannedMeApi = async () => {
  try {
    const result = await axiosDefault.get(
      "/api/v1/app/scans/exhibitor/scanned/me?eventId=1"
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const myScansApi = async () => {
  try {
    const result = await axiosDefault.get(
      "/api/v1/app/scans/exhibitor/scanned/byme?eventId=1"
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const vendorsApi = async ({ queryKey }) => {
  try {
    const result = await axiosDefault.get(
      "/api/v1/app/vendors?" + objectToQueryParams(queryKey[1])
    );
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const eventsApi = async () => {
  try {
    const result = await axiosDefault.get("api/v1/app/events");
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const getAppVersionApi = async (payload) => {
  try {
    const result = await axiosDefault.post(`/api/v1/auth/version`, payload);
    return result?.data;
  } catch (error) {
    throw error;
  }
};

//////////////////////////// NEWS FEED //////////////////////////////////
export const uploadPostApi = async (payload) => {
  try {
    const result = await axiosMultipart.post(
      "/api/user/posts/uploadPost",
      payload
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const toggleLikePostApi = async (payload) => {
  try {
    const result = await axiosDefault.post(
      "/api/user/posts/toggleLikePost",
      payload
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const bookcasesApi = async () => {
  const API_KEY =
    "$2b$10$KhoLHNrVXX5m6fqO5xaAP.YhiYEPbUq9zDQHAuWEH7SlBg/2GsEWi";
  try {
    axiosDefault.defaults.headers.common["x-api-key"] = API_KEY;

    const result = await axiosDefault.get(
      "/api/v1/shared/shelves/bookcases"
    );
    return result.data
  } catch (error) {
    throw error;
  }
};

export const getCommentsApi = async ({
  postId = "",
  page = 1,
  limit = COMMENTS_LIMIT,
}) => {
  try {
    const result = await axiosDefault.get(
      `/api/user/posts/getComments?postId=${postId}&page=${page}&limit=${limit}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const postCommentApi = async (payload) => {
  try {
    const result = await axiosDefault.post(
      "/api/user/posts/postComment",
      payload
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
