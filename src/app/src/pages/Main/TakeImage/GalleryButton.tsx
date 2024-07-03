import { Box, Circle, Icon } from '@chakra-ui/react';
import { IoImageOutline } from 'react-icons/io5';

interface GalleryButtonProps {
  onClick: () => void;
}

export default function GalleryButton({ onClick }: GalleryButtonProps) {
  return (
    <Box flex="1" display="flex" justifyContent="center">
      <Circle size="3rem" bg="#66666633" onClick={onClick} border="1px solid white">
        <Icon as={IoImageOutline} fontSize="2xl" />
      </Circle>
    </Box>
  );
}
