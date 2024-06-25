import { Maybe } from '@/types';
import { Button, Image, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: { exact: 'environment' },
};

export default function CaptureImage() {
  const [currentDeviceId, setCurrentDeviceId] = useState<string>();
  const [imageSrc, setImageSrc] = useState<Maybe<string>>(null);
  const [, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(mediaDevices => {
      const supportDevices = mediaDevices.filter(item => item.kind === 'videoinput');
      console.log(supportDevices);
      setDevices(supportDevices);
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
  }, [webcamRef]);

  return (
    <>
      <Image src={imageSrc || ''} />
      <Text fontSize={'xl'}>{imageSrc}</Text>
      <Webcam
        width={640}
        height={480}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ ...videoConstraints, deviceId: currentDeviceId }}
      />
      <Button onClick={capture}>Capture</Button>
    </>
  );
}
