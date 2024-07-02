import { Maybe } from '@/types';
import { Box, Button, HStack } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

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
      <HStack spacing={4}>
        <Button onClick={onCapture}>Take Photo</Button>
      </HStack>
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
