import { Box, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import { detectApi } from '@/api/detect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DetectResponseModel, Maybe } from '@/types';
import { useSetAtom } from 'jotai';
import { detectResultAtom, selectedImage } from '@/store';
import { dataUrlToFile } from '@/utils';
import Webcam from 'react-webcam';
import ImageActionsOverlay from '../Home/components/ImageActionsOverlay';
import { Loading } from '@/components';
import FloatingCloseButton from '@/components/FloatingCloseButton';
import { syncManager } from '@/services/db';

const videoConstraints = {
  facingMode: 'environment',
};

export default function CaptureScreen() {
  const [, setImageSrc] = useState<Maybe<string>>(null);
  const setSelectedImage = useSetAtom(selectedImage);
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const setResult = useSetAtom(detectResultAtom);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<DetectResponseModel, Error, File>({
    mutationFn: detectApi,
    onSuccess: data => {
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ['analysisHistory'] });
      queryClient.invalidateQueries({ queryKey: ['recentAnalyses'] });
      navigate('/result');
    },
  });

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    if (!imageSrc) return;
    setImageSrc(imageSrc);
    console.log('isOnline', navigator.onLine);

    if (navigator.onLine) {
      // Online: direct analysis
      const file = dataUrlToFile(imageSrc, 'capture.png');
      if (file) {
        mutate(file);
        setSelectedImage(file);
      }
    } else {
      // Offline: queue for later
      syncManager.queueAnalysis(imageSrc);
      toast({
        title: 'Image saved',
        description: 'Analysis will complete when you are back online',
        status: 'info',
      });
    }
  }, [mutate, setSelectedImage, toast]);

  const handleUpload = (file: Maybe<File>) => {
    if (!file) return;
    setSelectedImage(file);

    if (navigator.onLine) {
      // Online: direct analysis
      mutate(file);
    } else {
      // Offline: queue for later
      // Convert File to data URL for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        syncManager.queueAnalysis(dataUrl);
        toast({
          title: 'Image saved',
          description: 'Analysis will complete when you are back online',
          status: 'info',
        });
      };
      reader.readAsDataURL(file);
    }
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
