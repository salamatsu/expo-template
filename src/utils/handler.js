import { Linking } from "react-native";
import Toast from "react-native-toast-message";

export const errorHandler = (error) => {
  if (error.response) {
    // The request was made, and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response Error:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
    return { error: error.response.data };
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("Request Error:", error.request);
    return { error: "No response received from the server." };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error Message:", error.message);
    return { error: error.message };
  }
};

export const handleRedirect = (src) => {
  let url = src;
  if (!url.includes("https://")) {
    url = "https://" + src;
  }

  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Toast.show({
        type: "error",
        text1: `Invalid URL`,
        text2: `Cannot open URL: ${url}`,
      });
    }
  });
};
