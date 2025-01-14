import * as ImagePicker from "expo-image-picker";

export const useCamera = (setFile = () => { }) => {
  const processImageResult = (result) => {
    if (!result.canceled && result?.assets?.length > 0) {
      const fileUri = result.assets[0]?.uri;
      const fileName = fileUri?.substring(fileUri.lastIndexOf("/") + 1);
      const file = { ...result.assets[0], name: fileName, };
      setFile(file);
      return file;
    }
    return null;
  };

  const takeImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        // aspect: [3, 4],
        quality: .8,
      });
      return processImageResult(result);
    } catch (error) {
      console.error("Error taking image:", error);
      return null;
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        // allowsMultipleSelection: true,
        // selectionLimit: 6,
        // aspect: [3, 4],
        quality: .8,
      });
      return processImageResult(result);
    } catch (error) {
      console.error("Error picking image:", error);
      return null;
    }
  };

  return {
    takeImage,
    pickImage,
  };
};
