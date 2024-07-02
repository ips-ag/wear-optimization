import { Maybe } from '@/types';
import { Box, Circle, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import WalterLogo from '../../../assets/images/walter-logo.png';

const videoConstraints = {
  facingMode: 'environment',
};

interface ImageActionsOverlayProps {
  onCapture: () => void;
}

const ImageActionsOverlay = ({ onCapture }: ImageActionsOverlayProps) => {
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
        <VStack
          w="full"
          h="full"
          justifyContent="end"
          rounded="3xl"
          position="relative"
          border="2px solid green"
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -1,
              left: -1,
              width: 'calc(100% + 8px)',
              height: 'calc(100% + 8px)',
              border: '6px solid white', // Border width and color
              pointerEvents: 'none', // Ensures it doesn't block clicks
              boxSizing: 'border-box',
              clipPath: `polygon(
              0 70px, 
              70px 70px,
               70px 0, 
               calc(100% - 70px) 0, 
               calc(100% - 70px) 70px, 
               100% 70px, 
               100% calc(100% - 70px), 
               calc(100% - 70px) calc(100% - 70px), 
               calc(100% - 70px) 100%, 
               70px 100%, 
               70px calc(100% - 70px), 
               0 calc(100% - 70px))
      `,
            },
          }}
        >
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
};

export default function TakeImage() {
  const [, setImageSrc] = useState<Maybe<string>>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <Box w="full" h="full" position={'relative'}>
      <Webcam
        width={'100%'}
        height={'100%'}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        videoConstraints={videoConstraints}
      />
      <ImageActionsOverlay onCapture={capture} />
    </Box>
  );
}
