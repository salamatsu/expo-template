import { useMutation } from "@tanstack/react-query";
import {
  getMediaFilesApi,
  getPostsApi,
  requestApi,
  validateApi,
} from "../api/auth";

export const useRequestApi = () => {
  return useMutation({
    mutationFn: requestApi,
  });
};

export const useValidateApi = () => {
  return useMutation({
    mutationFn: validateApi,
  });
};

export const useGetPostsApi = () => {
  return useMutation({
    mutationFn: getPostsApi, // Pass page and limit to the query function
    retry: false,
  });
};

export const useGetMediaFilesApi = () => {
  return useMutation({
    mutationFn: getMediaFilesApi,
    retry: false,
  });
};
