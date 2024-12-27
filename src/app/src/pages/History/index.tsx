import BottomNavigation from '@/components/BottomNavigation';
import Navbar from '@/components/Navbar';
import { getWearCodeName } from '@/helpers';
import { historyService } from '@/services/history';
import { Box, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  const queryClient = useQueryClient();
  const { data: historyItems } = useQuery({
    queryKey: ['analysisHistory'],
    queryFn: historyService.getAllAnalyses,
  });

  const deleteMutation = useMutation({
    mutationFn: historyService.deleteAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysisHistory'] });
      queryClient.invalidateQueries({ queryKey: ['recentAnalyses'] });
    },
  });

  return (
    <Box h="100vh">
      <Navbar showLogo title="Analysis History" />

      <VStack w="full" spacing={4} py={4} pb={24}>
        {historyItems?.map(item => (
          <Box
            key={item.id}
            as={Link}
            to={`/result/${item.id}`}
            w="full"
            bg="white"
            p={4}
            rounded="xl"
            shadow="sm"
            _hover={{ shadow: 'md' }}
          >
            <HStack spacing={4}>
              <Image src={item.imageSrc} boxSize="80px" objectFit="cover" rounded="lg" />
              <VStack align="start" spacing={2} flex={1}>
                <Text fontSize="lg" fontWeight="600">
                  {getWearCodeName(item.result.wearCode?.toString())}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {format(item.timestamp, 'PPpp')}
                </Text>
              </VStack>
              <IconButton
                aria-label="Delete"
                icon={<BiTrash />}
                variant="ghost"
                colorScheme="red"
                onClick={e => {
                  e.preventDefault();
                  deleteMutation.mutate(item.id);
                }}
              />
            </HStack>
          </Box>
        ))}
      </VStack>

      <BottomNavigation />
    </Box>
  );
}
