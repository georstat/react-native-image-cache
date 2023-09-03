import { Platform } from "react-native";

export function isRemoteImage(url){
  // Check if the URL starts with 'http://' or 'https://' and not a number (using Require method)
  if (url && !isImageWithRequire(url) && (url?.startsWith('http://') || url?.startsWith('https://'))) {
    return true; // Remote image
  }
  return false;
}

export function isAndroid() {
  return Platform.OS == "android";
}

export function isImageWithRequire(url) {
  return typeof url === 'number';
}
