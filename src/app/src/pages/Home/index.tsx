import detectApi from '@/api/detect';
import CameraCapture from '@/components/CameraCapture';
import { DetectResponseModel, Maybe } from '@/types';
import { Box, Progress, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

// function dataURLtoFile(dataUrl: string, filename: string) {
//   var arr = dataUrl.split(',');

//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[arr.length - 1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// }

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
  const [detectResult, setDetectResult] = useState(undefined as DetectResponseModel | undefined);
  const [imageUri, setImageUri] = useState(undefined as string | undefined);
  console.log('imageUri', imageUri);

  const { mutate, isPending } = useMutation<DetectResponseModel, Error, File>({
    mutationFn: detectApi,
    onSuccess: data => {
      setDetectResult(data);
    },
  });

  const handleCapture = (imageSrc: Maybe<string>) => {
    if (!imageSrc) return;
    const file = dataUrlToFile(imageSrc, 'capture.png');
    console.log('file', file);
    if (file) {
      mutate(file);
    }
  };

  return (
    <Box w={'full'}>
      <Text fontSize={'xl'}>Welcome home</Text>
      {isPending && <Progress size="xs" isIndeterminate />}
      <CameraCapture onCapture={handleCapture} />
      <div className="card">
        {imageUri && (
          <div>
            <img src={imageUri} alt="selected" />
          </div>
        )}
        <input
          type="file"
          accept=".jpg,.png"
          onChange={event => {
            const file = event.target.files?.[0];
            console.log('file', file);
            if (file) {
              setDetectResult(undefined);
              setImageUri(URL.createObjectURL(file));
              const reader = new FileReader();
              reader.onload = async event => {
                await fetch('/api/detect', {
                  method: 'POST',
                  headers: {
                    'Content-Type': file.type,
                  },
                  body: event.target?.result,
                })
                  .then(response => response.json())
                  .then(data => {
                    const responseModel: DetectResponseModel = data;
                    setDetectResult(responseModel);
                  });
              };
              reader.readAsArrayBuffer(file);
            }
          }}
        />
        {detectResult && (
          <div>
            <pre>{JSON.stringify(detectResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </Box>
  );
}
