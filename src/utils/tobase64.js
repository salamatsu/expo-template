import * as FileSystem from "expo-file-system";

// File to base64
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertToBase64 = async (file) => {
  try {
    const result = await toBase64(file);
    return result;
  } catch (error) {
    alert("Image convertion failed. Please try again or contact support.");
    return;
  }
};

// URL to base64
export const imageToBase64 = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const base64 = canvas.toDataURL("image/png");
      resolve(base64);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
  });
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const renameFile = async (fileUri, newFileName) => {
  try {
    // Get the directory path and the old file name
    const filePath = fileUri.substring(0, fileUri.lastIndexOf("/"));

    // Create the new file path with the new file name
    const newFilePath = `${filePath}/${newFileName}`;

    // Copy the file to the new path
    await FileSystem.copyAsync({
      from: fileUri,
      to: newFilePath,
    });

    // Optionally delete the old file
    await FileSystem.deleteAsync(fileUri);

    // console.log("File renamed successfully:", newFilePath);
    return newFilePath;
  } catch (error) {
    // console.error("Error renaming the file:", error);
    throw error;
  }
};
