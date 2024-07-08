import { Maybe } from '@/types';
import { HStack, Text } from '@chakra-ui/react';

interface Props {
  wearConfident: Maybe<number>;
}
export default function AccurateText({ wearConfident }: Props) {
  const accurateConfidence = Number(((wearConfident ?? 0) * 100).toFixed(0));
  const accurateConfidenceColor =
    accurateConfidence > 80
      ? 'brand.green.primary'
      : accurateConfidence > 50
        ? 'brand.yellow.primary'
        : 'brand.red.primary';

  return (
    <HStack spacing={1} color={accurateConfidenceColor}>
      <Text fontWeight={700} fontSize="lg">{`${accurateConfidence}%`}</Text>
      <Text>{'accurate'}</Text>
    </HStack>
  );
}
