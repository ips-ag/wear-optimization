import { Box, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box position="absolute" top={0} left={0} width="full" h="full">
      <Box position="absolute" top={0} left={0} width="full" h="full" bg="blackAlpha.500" />
      <Box position="absolute" top="50%" left="calc(50% + 2px)" transform="translate(-50%, -50%)">
        <Spinner thickness="4px" speed="0.65s" emptyColor="brand.grey.200" color="green" size="xl" />
      </Box>
    </Box>
  );
}
