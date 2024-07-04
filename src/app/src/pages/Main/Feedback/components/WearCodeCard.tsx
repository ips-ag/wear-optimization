import { WearCode, wearCodeNameMap } from '@/types';
import { HStack, Image, Text, VStack } from '@chakra-ui/react';

interface Props {
  wearCodeName: string;
  onSelect?: (wearCode: string) => void;
}
const wearDrawingGallery = Object.values(
  import.meta.glob('@assets/images/wear/*_drawing.png', { eager: true, as: 'url' }),
);

const getImagePath = (wearCodeName: string) => {
  return wearDrawingGallery.find(url => url.includes(wearCodeName));
};

export default function WearCodeCard({ wearCodeName, onSelect }: Props) {
  const code = WearCode[wearCodeName as keyof typeof WearCode];

  return (
    <HStack w="full" h="max" onClick={() => onSelect?.(wearCodeName)} cursor="pointer">
      <Image boxSize="100px" src={getImagePath(wearCodeName)} objectFit="contain" />
      <VStack spacing={0}>
        <Text color="green" fontSize="lg">
          {wearCodeNameMap[code]}
        </Text>
        <Text fontSize="lg">{wearCodeNameMap[code]}</Text>
      </VStack>
    </HStack>
  );
}
