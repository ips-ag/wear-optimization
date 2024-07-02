import { Box } from '@chakra-ui/react';
import TakeImage from './TakeImage';

const ImageActionsOverlay = () => {
  return (
    <Box
      position="absolute"
      bottom={0}
      w="full"
      h="20%"
      bg="rgba(0,0,0,0.3)"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>Image Actions</Box>
    </Box>
  );
};

export default function Main() {
  return (
    <Box w="full" h="full" position={'relative'}>
      <TakeImage />
      <ImageActionsOverlay />
    </Box>
  );
}
