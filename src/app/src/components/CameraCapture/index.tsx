import { Maybe } from '@/types';
import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: { exact: 'environment' },
};

interface CaptureImageProps {
  onCapture: (imageSrc: Maybe<string>) => void;
}
export default function CaptureImage({ onCapture }: CaptureImageProps) {
  const [currentDeviceId, setCurrentDeviceId] = useState<string>();
  const [imageSrc, setImageSrc] = useState<Maybe<string>>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(mediaDevices => {
      const supportDevices = mediaDevices.filter(item => item.kind === 'videoinput');
      console.log(supportDevices);
      if (supportDevices.length > 0) {
        setCurrentDeviceId(supportDevices[0].deviceId);
      }
    });
  }, []);

  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    console.log(webcamRef);
    const imageSrc = webcamRef.current?.getScreenshot?.();
    setImageSrc(imageSrc);
    onCapture(imageSrc || '');
  }, [webcamRef]);

  return (
    <VStack>
      <Text>{imageSrc}</Text>
      <Box maxW={'640'} border={1} borderStyle={'dashed'} borderColor={'grey.100'} rounded={'sm'}>
        {imageSrc ? (
          <Image w={'full'} src={imageSrc || ''} />
        ) : (
          <Webcam
            width={'100%'}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{ ...videoConstraints, deviceId: currentDeviceId }}
          />
        )}
      </Box>
      {imageSrc ? (
        <Button onClick={() => setImageSrc(null)}>Retake</Button>
      ) : (
        <Button onClick={capture}>Capture</Button>
      )}
    </VStack>
  );
}
