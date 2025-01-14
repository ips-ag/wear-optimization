import { Box, Text, VStack } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Form from './components/Form';

export default function FeedbackPage() {
  return (
    <Box h="100vh" bg="gray.50">
      <Navbar showBack title="Feedback" />

      <VStack w="full" spacing={6} p={4}>
        <VStack spacing={1}>
          <Text fontSize="lg" fontWeight="600" color="gray.800">
            Incorrect wear pattern?
          </Text>
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Please help us improve by selecting the correct wear pattern and providing your feedback.
          </Text>
          <Form />
        </VStack>
      </VStack>
    </Box>
  );
}
