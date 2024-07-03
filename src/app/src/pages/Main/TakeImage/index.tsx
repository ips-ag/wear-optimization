import { Maybe } from '@/types';
import { Box } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import ImageActionsOverlay from './ImageActionsOverlay';

const videoConstraints = {
  facingMode: 'environment',
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
