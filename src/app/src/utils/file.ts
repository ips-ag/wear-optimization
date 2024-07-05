import { Maybe } from '@/types';

export const dataUrlToFile = (dataUrl: string, filename: string): Maybe<File> => {
  const arr = dataUrl?.split?.(',');
  if (!arr) return null;

  const mime = arr[0]?.match(/:(.*?);/)?.[1];
  const bstr = atob(arr[arr.length - 1] ?? '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
