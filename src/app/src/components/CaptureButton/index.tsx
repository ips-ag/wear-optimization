import { Box, IconButton } from '@chakra-ui/react';
import { BiCamera } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function CaptureButton() {
  return (
    <Box position="fixed" bottom="70px" right="20px" zIndex={1000}>
      <IconButton
        as={Link}
        to="/capture"
        icon={<BiCamera size={24} />}
        aria-label="Capture"
        colorScheme="green"
        size="lg"
        rounded="full"
        w="60px"
        h="60px"
        boxShadow="lg"
        _hover={{
          transform: 'scale(1.05)',
        }}
        transition="all 0.2s"
      />
    </Box>
  );
}
