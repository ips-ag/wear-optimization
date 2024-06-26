import detectApi from '@/api/detect';
import CameraCapture from '@/components/CameraCapture';
import { DetectResponseModel, Maybe } from '@/types';
import { Box, Progress, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

// base 64 to blob with imgSrc have format "data:image/png;base64,..."
function b64toBlob(imgSrc: string) {
  const byteString = atob(imgSrc.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  const mimeString = imgSrc.split(',')[0].split(':')[1].split(';')[0];
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export default function Home() {
  const [detectResult, setDetectResult] = useState(undefined as DetectResponseModel | undefined);
  const [imageUri, setImageUri] = useState(undefined as string | undefined);
  console.log('imageUri', imageUri);

  const { mutate, isIdle } = useMutation<DetectResponseModel, Error, Blob>({
    mutationFn: detectApi,
    onSuccess: data => {
      setDetectResult(data);
    },
  });

  const handleCapture = (imageSrc: Maybe<string>) => {
    if (!imageSrc) return;
    const blob = b64toBlob(imageSrc);
    mutate(blob);
  };

  return (
    <Box w={'full'}>
      <Text fontSize={'xl'}>Welcome home</Text>
      {isIdle && <Progress size="xs" isIndeterminate />}
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
