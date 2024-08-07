import { Box, Circle } from '@chakra-ui/react';

interface CaptureButtonProps {
  onClick: () => void;
}

export default function CaptureButton({ onClick }: CaptureButtonProps) {
  return (
    <Box flex="1" display="flex" justifyContent="center">
      <Circle size="4rem" p="2px" bg="white" border="2px solid" borderColor="brand.green.70" onClick={onClick}>
        <Circle bg="brand.green.70" size="full" />
      </Circle>
    </Box>
  );
}
