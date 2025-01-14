import { getWearCodeName } from '@/helpers';
import { historyService } from '@/services/history';
import { Box, HStack, Image, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function RecentAnalysis() {
  const { data: recentItems, isLoading } = useQuery({
    queryKey: ['recentAnalyses'],
    queryFn: () => historyService.getRecentAnalyses(3),
  });

  if (isLoading) {
    return (
      <Box bg="white" p={4} rounded="xl" shadow="sm">
        <HStack justify="space-between" mb={4}>
          <Skeleton height="24px" width="150px" />
          <Skeleton height="20px" width="60px" />
        </HStack>
        <VStack spacing={4} align="stretch">
          {[...Array(3)].map((_, i) => (
            <HStack key={i} spacing={4}>
              <Skeleton boxSize="60px" rounded="lg" />
              <VStack align="start" spacing={1} flex={1}>
                <SkeletonText noOfLines={2} spacing={2} />
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  }

  return (
    <Box w="full" bg="white" p={4} shadow="sm" data-testid="recent-analysis">
      <HStack justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="600" color="gray.800">
          Recent Analysis
        </Text>
        <Text as={Link} to="/history" fontSize="sm" color="brand.green.primary" data-testid="view-all-history">
          View All
        </Text>
      </HStack>

      {!recentItems || recentItems.length === 0 ? (
        <Text fontSize="sm" color="gray.500" textAlign="center" py={8} data-testid="no-recent-analysis">
          No recent analysis yet.
          <br />
          Start by capturing a new image.
        </Text>
      ) : (
        <VStack spacing={4} align="stretch" data-testid="recent-analysis-list">
          {recentItems.map(item => (
            <HStack
              key={item.id}
              spacing={4}
              as={Link}
              to={`/result/${item.id}`}
              data-testid={`recent-analysis-item-${item.id}`}
            >
              <Image
                src={item.imageSrc}
                boxSize="60px"
                objectFit="cover"
                rounded="lg"
                data-testid="recent-analysis-image"
              />
              <VStack align="start" spacing={1} flex={1}>
                <Text fontSize="md" fontWeight="500" color="gray.800" data-testid="recent-analysis-title">
                  {getWearCodeName(item.result.wearCode?.toString())}
                </Text>
                <Text fontSize="sm" color="gray.600" data-testid="recent-analysis-date">
                  {format(item.timestamp, 'MMM d, yyyy')}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
}
