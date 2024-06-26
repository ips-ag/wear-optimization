import { ResultModel } from '@/types';
import { HStack, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';

interface DetectResultProps {
  result: ResultModel;
}
export default function DetectResult({ result }: DetectResultProps) {
  const { wearCode, wearConfidence, wearCause, suggestedActions } = result;

  return (
    <VStack align={'start'} boxShadow="base" p="6" rounded="md" bg="white">
      <Text>Wear Code: {wearCode}</Text>
      <Text>Wear Confidence: {wearConfidence?.toFixed?.(2)}</Text>
      <Text>Wear Cause: {wearCause}</Text>

      <HStack>
        <Text>Suggested Actions:</Text>
        <UnorderedList>
          {suggestedActions?.map((action, index) => <ListItem key={index}>{action}</ListItem>)}
        </UnorderedList>
      </HStack>
    </VStack>
  );
}
