import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SCREEN_NAVIGATION } from "../constants/navigations";
import Home from "../Screens/Home";
import Login from "../Screens/Login/Index";
import { useUserAuthStore } from "../store/useUserAuthStore";
import Profile from "../Screens/Home/Profile";

export const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { token, userInfo } = useUserAuthStore();

  return token && userInfo ? (
    <Stack.Navigator
      initialRouteName={SCREEN_NAVIGATION.Home}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAVIGATION.Home} component={Home} />
      <Stack.Screen name={SCREEN_NAVIGATION.Profile} component={Profile} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName={SCREEN_NAVIGATION.Login}>
      <Stack.Screen
        name={SCREEN_NAVIGATION.Login}
        options={{
          headerShown: false,
        }}
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
