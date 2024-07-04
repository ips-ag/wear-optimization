import { Box, Center, Text } from '@chakra-ui/react';

export function ImageFallback() {
  return (
    <Box w="full">
      <Center>
        <Text>No image</Text>
      </Center>
    </Box>
  );
}
