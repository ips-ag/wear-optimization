import detectApi from '@/api/detect';
import { Loading } from '@/components';
import { detectResultAtom, selectedImage } from '@/store';
import { DetectResponseModel, Maybe } from '@/types';
import { dataUrlToFile } from '@/utils';
import { Box } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import ImageActionsOverlay from './components/ImageActionsOverlay';

const videoConstraints = {
  facingMode: 'environment',
};

export default function HomePage() {
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
      {isPending && <Loading />}
    </Box>
  );
}
