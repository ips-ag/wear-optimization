import { Box, Circle, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import WalterLogo from '../../../assets/images/walter-logo.png';
import CameraBorder from './CameraBorder';

interface ImageActionsOverlayProps {
  onCapture: () => void;
}
export default function ImageActionsOverlay({ onCapture }: ImageActionsOverlayProps) {
  return (
    <Box
      position="absolute"
      bottom={0}
      w="full"
      h="full"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={4} justifyContent="space-between" h="full" p="4" px="8">
        <Image src={WalterLogo} maxW="158px" />
        <VStack w="full" h="full" justifyContent="end" position="relative">
          <CameraBorder borderColor="green" borderRadius="32px" borderWidth="2px" edgeSize="70px" />
          <HStack w="full" p="4">
            <Box flex="1" display="flex" justifyContent="center">
              <Circle rounded="full" p={6} bg="green" onClick={onCapture}></Circle>
            </Box>
            <Spacer />
            <Box flex="1" display="flex" justifyContent="center">
              <Circle rounded="full" p={8} bg="green" onClick={onCapture}></Circle>
            </Box>
            <Spacer />
            <Spacer />
          </HStack>
        </VStack>
        <VStack spacing={4} color="black">
          <Text fontWeight={800}>Wear Optimization AI</Text>
          <Text>Take photo of a tool, or load it from the picture library.</Text>
        </VStack>
      </VStack>
    </Box>
  );
}
