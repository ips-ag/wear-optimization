import { ImageUploader } from '@/components';
import { useGallery } from '@/hooks';
import { Maybe } from '@/types';
import { Box, Circle, Icon } from '@chakra-ui/react';
import { IoImageOutline } from 'react-icons/io5';

interface GalleryButtonProps {
  onUpload: (file: Maybe<File>) => void;
}

export default function GalleryButton({ onUpload }: GalleryButtonProps) {
  const { inputUploadRef, openGallery } = useGallery();

  return (
    <Box flex="1" display="flex" justifyContent="center">
      <Circle size="3rem" bg="#66666633" border="1px solid white" onClick={openGallery}>
        <Icon as={IoImageOutline} fontSize="2xl" pointerEvents="none" />
        <ImageUploader inputRef={inputUploadRef} onUpload={onUpload} />
      </Circle>
    </Box>
  );
}
