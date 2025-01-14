import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {
  bookcasesApi,
  eventsApi,
  exhibitorScanApi,
  getAppVersionApi,
  getCommentsApi,
  myScansApi,
  postCommentApi,
  scannedMeApi,
  toggleLikePostApi,
  uploadPostApi,
  vendorsApi,
} from "../api/apis";
import { staticLinksApi } from "../api/auth";

export const useGetEventsApi = () => {
  return useQuery({
    queryKey: ["eventsApiKey"],
    queryFn: eventsApi,
    initialData: [],
    refetchOnWindowFocus: false,
  });
};

export const useStaticLinksApi = () => {
  return useQuery({
    queryKey: ["staticLinksApiKey"],
    queryFn: staticLinksApi,
    initialData: {},
    refetchOnWindowFocus: false,
  });
};

export const useGetVendorsApi = () => {
  return useQuery({
    queryKey: ["vendorsApiKey", { eventId: 1 }],
    queryFn: vendorsApi,
    initialData: [],
    throwOnError: (error) => {
      Toast.show({
        swipeable: true,
        type: "info",
        text1: "Request failed",
        text2:
          error?.response?.data?.message ||
          "Fetching exhibitors list: Please check your connection or contact support.",
      });
    },
    refetchOnWindowFocus: false,
  });
};

export const useGetMyScansApi = () => {
  return useQuery({
    queryKey: ["myScansApiKey"],
    queryFn: myScansApi,
    initialData: [],
    // throwOnError: (error) => {
    //   Toast.show({
    //     swipeable: true,
    //     type: "info",
    //     text1: "Request failed",
    //     text2:
    //       error?.response?.data?.message ||
    //       "Fetching my scans: Please check your connection or contact support.",
    //   });
    // },
    refetchOnWindowFocus: false,
  });
};

export const useGetScannedMeApi = () => {
  return useQuery({
    queryKey: ["scannedMeApiKey"],
    queryFn: scannedMeApi,
    initialData: [],
    // throwOnError: (error) => {
    //   Toast.show({
    //     swipeable: true,
    //     type: "info",
    //     text1: "Request failed",
    //     text2:
    //       error?.response?.data?.message ||
    //       "Fetching scanned me: Please check your connection or contact support.",
    //   });
    // },
    refetchOnWindowFocus: false,
  });
};

export const useExhibitorScanApi = () => {
  return useMutation({
    mutationFn: exhibitorScanApi,
  });
};

export const useGetAppVersionApi = () => {
  return useMutation({
    mutationFn: getAppVersionApi,
  });
};

////////////////////////// NEWS FEED //////////////////////////////////
export const useUploadPostApi = () => {
  return useMutation({
    mutationFn: uploadPostApi,
  });
};

export const useToggleLikePostApi = () => {
  return useMutation({
    mutationFn: toggleLikePostApi,
  });
};

export const useGetCommentsApi = () => {
  return useMutation({
    mutationFn: getCommentsApi, // Pass page and limit to the query function
  });
};

export const usePostCommentApi = () => {
  return useMutation({
    mutationFn: postCommentApi, // Pass page and limit to the query function
  });
};



export const useBookcasesApi = () => {
  return useQuery({
    queryKey: ["bookcases"],
    queryFn: bookcasesApi,
    initialData: [],
  });
};
