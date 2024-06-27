import detectApi from '@/api/detect';
import CameraCapture from '@/components/CameraCapture';
import UploadButton from '@/components/UploadButton';
import { DetectResponseModel, Maybe } from '@/types';
import { Box, Button, Center, HStack, Image, Progress, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import DetectResult from './components/DetectResult';
import { dataUrlToFile } from '@/utils';

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
        {isPending && <Progress size="xs" isIndeterminate />}
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

        {detectResult?.result && <DetectResult result={detectResult.result} />}
      </VStack>
      <CameraCapture isOpen={isOpenCamera} onClose={onCloseCamera} onCapture={handleCapture} />
    </Center>
  );
}
