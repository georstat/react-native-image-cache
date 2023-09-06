import { Platform } from 'react-native';

export function isRemoteImage(url: any) {
  /* Check if the URL starts with 'http://' or 'https://' and not a number (using require method) */
  if (!url) {
    return false;
  }

  if (
    !isImageWithRequire(url) &&
    (url.startsWith('http://') || url.startsWith('https://'))
  ) {
    return true; // remote image
  }
  return false;
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isImageWithRequire(url: any) {
  return typeof url === 'number';
}
