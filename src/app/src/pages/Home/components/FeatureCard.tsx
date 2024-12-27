import { Box, Icon, Text, VStack } from '@chakra-ui/react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Box p={4} bg="white" rounded="xl" shadow="sm" data-testid={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <VStack align="start" spacing={3}>
        <Icon as={icon} fontSize="2xl" color="brand.green.primary" />
        <Text fontSize="lg" fontWeight="600" color="gray.800">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
