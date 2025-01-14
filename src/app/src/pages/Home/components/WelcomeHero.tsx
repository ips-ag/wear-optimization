import { Text, VStack } from '@chakra-ui/react';

export default function WelcomeHero() {
  return (
    <VStack spacing={2} pb={2}>
      <Text fontSize="2xl" fontWeight="700" color="gray.800" textAlign="center">
        Wear Pattern Analysis
      </Text>
      <Text fontSize="md" color="gray.600" textAlign="center">
        Analyze tool wear patterns instantly using AI technology
      </Text>
    </VStack>
  );
}
