import { ResultModel } from '@/types';
import { HStack, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

interface DetectResultProps {
  result: ResultModel;
}
export default function DetectResult({ result }: DetectResultProps) {
  const { wearCode, wearConfidence, wearCause, suggestedActions } = result;

  return (
    <VStack align={'start'} boxShadow="base" p="6" rounded="md" bg="white">
      <HStack>
        <Text fontStyle={'bold'}>Wear code: </Text>
        <Text>{wearCode}</Text>
      </HStack>
      <HStack>
        <Text>Confidence: </Text>
        <Text>{((wearConfidence || 0) * 100).toFixed?.(2)}</Text>
      </HStack>
      <HStack>
        <Text fontStyle={'bold'}>Cause: </Text>
        <Text>Cause: {wearCause}</Text>
      </HStack>

      <HStack align={'start'}>
        <Text fontStyle={'bold'}>Suggested Actions:</Text>
        <UnorderedList>
          {suggestedActions?.map((action, index) => <ListItem key={index}>{action}</ListItem>)}
        </UnorderedList>
      </HStack>
    </VStack>
  );
}
