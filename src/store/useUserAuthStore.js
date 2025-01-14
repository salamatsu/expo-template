import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


const data = {
  userInfo: {
    firaName: 'John',
    lastName: 'the baptist'
  },
  token: '123tokenhere'
}

export const useUserAuthStore = create(
  persist(
    (set) => ({
      userInfo: data.userInfo,
      token: data.token,
      setUserInfo: (userInfo) => set({ userInfo }),
      setToken: (token) => set({ token }),
      reset: () => set({ token: null, userInfo: null }),
    }),
    {
      name: "user-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
