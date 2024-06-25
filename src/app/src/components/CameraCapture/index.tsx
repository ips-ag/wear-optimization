import { Maybe } from '@/types';
import { Button, Image, Text } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: { exact: 'environment' },
  width: 1280,
  height: 720,
};

export default function CaptureImage() {
  const [imageSrc, setImageSrc] = useState<Maybe<string>>(null);

  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    console.log(webcamRef);
    const imageSrc = webcamRef.current?.getScreenshot?.();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Image src={imageSrc || ''} />
      <Text fontSize={'xl'}>{imageSrc}</Text>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
      <Button onClick={capture}>Capture</Button>
    </>
  );
}
