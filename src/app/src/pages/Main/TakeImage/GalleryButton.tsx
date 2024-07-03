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
      <Circle size="3rem" bg="#66666633" onClick={openGallery} border="1px solid white">
        <Icon as={IoImageOutline} fontSize="2xl" />
      </Circle>
      <ImageUploader inputRef={inputUploadRef} onUpload={onUpload} />
    </Box>
  );
}
