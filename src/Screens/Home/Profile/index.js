import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>Profile</Text>

      <Button onPress={() => navigation.goBack()}>
        Go to Back
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
