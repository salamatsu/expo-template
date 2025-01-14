import React from "react";
import { View } from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import { useTheme } from "react-native-paper";

const LoadingScreen = ({ color, size = 70 }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SkypeIndicator color={color || colors.primary} size={size} />
    </View>
  );
};

export default LoadingScreen;
