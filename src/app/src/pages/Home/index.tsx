import detectApi from '@/api/detect';
import CameraCapture from '@/components/CameraCapture';
import { DetectResponseModel, Maybe } from '@/types';
import { Box, Button, Center, HStack, Image, Input, Progress, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import DetectResult from './components/DetectResult';
import UploadButton from '@/components/UploadButton';
import { MdOutlinePhotoCamera } from 'react-icons/md';

const dataUrlToFile = (dataUrl: string, filename: string): Maybe<File> => {
  const arr = dataUrl?.split?.(',');
  if (!arr) return null;

  const mime = arr[0]?.match(/:(.*?);/)?.[1];
  const bstr = atob(arr[arr.length - 1] ?? '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

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
        {imageUri && <Image src={imageUri} maxW={'720px'} />}
        {isPending && <Progress size="xs" isIndeterminate />}
        <HStack>
          <Button leftIcon={<MdOutlinePhotoCamera />} isLoading={isPending} onClick={onOpenCamera}>
            Open Camera
          </Button>
          <UploadButton accept=".jpg,.png" onUpload={handleUpload} />
        </HStack>

        {detectResult?.result && <DetectResult result={detectResult.result} />}
      </VStack>
      <CameraCapture isOpen={isOpenCamera} onClose={onCloseCamera} onCapture={handleCapture} />
    </Center>
  );
}
