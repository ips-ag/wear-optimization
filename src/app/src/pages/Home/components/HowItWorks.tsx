import { Box, HStack, Text, VStack } from '@chakra-ui/react';

interface StepProps {
  number: string;
  text: string;
}

const Step = ({ number, text }: StepProps) => (
  <HStack spacing={3}>
    <Box bg="brand.green.light" p={2} rounded="full">
      <Text fontSize="sm" fontWeight="600" color="brand.green.primary">
        {number}
      </Text>
    </Box>
    <Text fontSize="sm" color="gray.700">
      {text}
    </Text>
  </HStack>
);

export default function HowItWorks() {
  return (
    <Box w="full" bg="white" p={4} rounded="xl" shadow="sm">
      <Text fontSize="lg" fontWeight="600" color="gray.800" mb={4}>
        How It Works
      </Text>
      <VStack spacing={4} align="start">
        <Step number="1" text="Capture or upload a clear image of the tool wear pattern" />
        <Step number="2" text="AI analyzes the pattern and identifies the wear type" />
        <Step number="3" text="Get detailed analysis and recommended actions" />
      </VStack>
    </Box>
  );
}
