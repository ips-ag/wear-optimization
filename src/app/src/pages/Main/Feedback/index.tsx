import Navbar from '@/components/Navbar';
import { getWearCodeName } from '@/helpers';
import { resultSelector } from '@/store';
import { Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import FeedbackForm from './components/Form';

export default function FeedbackPage() {
  const detectResult = useAtom(resultSelector)[0];

  return (
    <VStack w="full" h="full" spacing="4" px="4">
      <Navbar backPath="/result" title={getWearCodeName(detectResult?.wearCode?.toString())} />

      <VStack w="full" spacing="3">
        <Text>
          Have we misidentified the wear pattern? Please help us improve recognition by selecting the correct pattern or
          leaving additional comments.
        </Text>
        <FeedbackForm imageName={detectResult?.imageName || ''} />
      </VStack>
    </VStack>
  );
}
