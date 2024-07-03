import { useRef } from 'react';

export const useGallery = () => {
  const inputUploadRef = useRef<HTMLInputElement>(null);

  const openGallery = () => {
    inputUploadRef.current?.click();
  };

  return {
    inputUploadRef,
    openGallery,
  };
};
