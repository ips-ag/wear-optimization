import { getWearImagePath } from '@/helpers';
import { WearCode, wearCodeNameMap } from '@/types';
import { HStack, Image, Text, VStack } from '@chakra-ui/react';

interface Props {
  wearCodeName: string;
  onSelect?: (wearCode: string) => void;
}

export default function WearCodeCard({ wearCodeName, onSelect }: Props) {
  const code = WearCode[wearCodeName as keyof typeof WearCode];

  return (
    <HStack w="full" h="max" onClick={() => onSelect?.(wearCodeName)} cursor="pointer">
      <Image boxSize="100px" src={getWearImagePath('drawing', wearCodeName)} objectFit="contain" />
      <VStack spacing={0}>
        <Text color="brand.green.primary" fontSize="lg">
          {wearCodeNameMap[code]}
        </Text>
        <Text fontSize="lg">{wearCodeNameMap[code]}</Text>
      </VStack>
    </HStack>
  );
}
