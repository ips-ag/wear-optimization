import detectApi from '@/api/detect';
import CameraCapture from '@/components/CameraCapture';
import UploadButton from '@/components/UploadButton';
import { DetectResponseModel, Maybe } from '@/types';
import { dataUrlToFile } from '@/utils';
import { Box, Button, Center, CircularProgress, HStack, Image, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import DetectResult from './components/DetectResult';
import FeedbackForm from './components/FeedbackForm';

export default function Home() {
  const [detectResult, setDetectResult] = useState<Maybe<DetectResponseModel>>(null);
  const [imageUri, setImageUri] = useState(undefined as string | undefined);
  const { isOpen: isOpenCamera, onClose: onCloseCamera, onOpen: onOpenCamera } = useDisclosure();
  console.log('imageUri', imageUri);

  const { mutate, isPending } = useMutation<DetectResponseModel, Error, File>({
    mutationFn: detectApi,
    onSuccess: data => {
      setDetectResult(data);
    },
  });

  const handleCapture = (imageSrc: Maybe<string>) => {
    onCloseCamera();
    if (!imageSrc) return;
    setImageUri(imageSrc);
    const file = dataUrlToFile(imageSrc, 'capture.png');
    console.log('file', file);
    if (file) {
      mutate(file);
    }
  };

  const handleUpload = (file: Maybe<File>) => {
    if (!file) return;

    setDetectResult(null);
    setImageUri(URL.createObjectURL(file));
    mutate(file);
  };

  return (
    <Center w={'full'} p={4}>
      <VStack w={'full'} spacing={3}>
        <Text fontSize={'xl'}>Wear Optimization</Text>

        {imageUri && (
          <Box maxW={'md'}>
            <Image w={'auto'} src={imageUri} rounded={'md'} boxShadow="base" />
          </Box>
        )}
        {isPending && <CircularProgress isIndeterminate color="green.300" />}
        {!isPending && (
          <HStack>
            <Button
              leftIcon={<MdOutlinePhotoCamera />}
              isLoading={isPending}
              onClick={onOpenCamera}
              loadingText="Uploading"
            >
              Open Camera
            </Button>
            <UploadButton accept=".jpg,.png" onUpload={handleUpload} isLoading={isPending} />
          </HStack>
        )}

        {detectResult?.result && (
          <VStack>
            <DetectResult result={detectResult.result} />
            <FeedbackForm imageName={detectResult.result.imageName} />
          </VStack>
        )}
      </VStack>
      <CameraCapture isOpen={isOpenCamera} onClose={onCloseCamera} onCapture={handleCapture} />
    </Center>
  );
}
