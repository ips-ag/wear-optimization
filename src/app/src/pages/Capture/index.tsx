import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import { detectApi } from '@/api/detect';
import { useMutation } from '@tanstack/react-query';
import { DetectResponseModel, Maybe } from '@/types';
import { useSetAtom } from 'jotai';
import { detectResultAtom, selectedImage } from '@/store';
import { dataUrlToFile } from '@/utils';
import Webcam from 'react-webcam';
import ImageActionsOverlay from '../Home/components/ImageActionsOverlay';
import { Loading } from '@/components';
import FloatingCloseButton from '@/components/FloatingCloseButton';

const videoConstraints = {
  facingMode: 'environment',
};

export default function CaptureScreen() {
  const [, setImageSrc] = useState<Maybe<string>>(null);
  const setSelectedImage = useSetAtom(selectedImage);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const setResult = useSetAtom(detectResultAtom);

  const { mutate, isPending } = useMutation<DetectResponseModel, Error, File>({
    mutationFn: detectApi,
    onSuccess: data => {
      setResult(data);
      navigate('/result');
    },
  });

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    if (!imageSrc) return;
    setImageSrc(imageSrc);
    const file = dataUrlToFile(imageSrc, 'capture.png');
    if (file) {
      mutate(file);
      setSelectedImage(file);
    }
  }, [mutate, setSelectedImage]);

  const handleUpload = (file: Maybe<File>) => {
    if (!file) return;
    setSelectedImage(file);
    mutate(file);
  };

  return (
    <Box h="100vh" w="100vw" position="fixed" top={0} left={0} bg="black">
      <Webcam
        width="100%"
        height="100%"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        videoConstraints={videoConstraints}
      />
      <FloatingCloseButton />
      <ImageActionsOverlay onCapture={handleCapture} onUpload={handleUpload} />
      {isPending && <Loading />}
    </Box>
  );
}
