import Logo from '@/components/Logo';
import { Maybe } from '@/types';
import { Box, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import CameraBorder from './CameraBorder';
import CaptureButton from './CaptureButton';
import GalleryButton from './GalleryButton';

interface ImageActionsOverlayProps {
  onCapture: () => void;
  onUpload: (file: Maybe<File>) => void;
}
export default function ImageActionsOverlay({ onCapture, onUpload }: ImageActionsOverlayProps) {
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
        <Logo />
        <VStack w="full" h="full" justifyContent="end" position="relative">
          <CameraBorder borderColor="green" borderRadius="32px" borderWidth="2px" edgeSize="70px" />
          <HStack w="full" p="4">
            <GalleryButton onUpload={onUpload} />
            <CaptureButton onClick={onCapture} />
            <Spacer />
          </HStack>
        </VStack>
        <VStack spacing={4} color="black">
          <Text fontWeight={700}>Wear Optimization AI</Text>
          <Text align="center">Take photo of a tool, or load it from the picture library.</Text>
        </VStack>
      </VStack>
    </Box>
  );
}
