import detectApi from '@/api/detect';
import { DetectResponseModel, Maybe } from '@/types';
import { Box } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import ImageActionsOverlay from './ImageActionsOverlay';
import { dataUrlToFile } from '@/utils';
import { useAtom } from 'jotai';
import { detectResultAtom } from '@/store';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  facingMode: 'environment',
};

export default function TakeImagePage() {
  const [, setImageSrc] = useState<Maybe<string>>(null);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const [, setDetectResult] = useAtom(detectResultAtom);
  const { mutate } = useMutation<DetectResponseModel, Error, File>({
    mutationFn: detectApi,
    onSuccess: data => {
      setDetectResult(data);
      console.log('data', data);
      navigate('/detect/result');
    },
  });

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    if (!imageSrc) return;
    setImageSrc(imageSrc);
    const file = dataUrlToFile(imageSrc, 'capture.png');
    if (file) {
      mutate(file);
    }
  }, [mutate]);

  const handleUpload = (file: Maybe<File>) => {
    if (!file) return;

    mutate(file);
  };

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
      <ImageActionsOverlay onCapture={handleCapture} onUpload={handleUpload} />
    </Box>
  );
}
