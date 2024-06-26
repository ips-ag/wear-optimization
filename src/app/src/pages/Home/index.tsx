import detectApi from '@/api/detect';
import CameraCapture from '@/components/CameraCapture';
import { DetectResponseModel, Maybe } from '@/types';
import { Box, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export default function Home() {
  const [detectResult, setDetectResult] = useState(undefined as DetectResponseModel | undefined);
  const [imageUri, setImageUri] = useState(undefined as string | undefined);
  console.log('imageUri', imageUri);

  const mutation = useMutation<DetectResponseModel, Error, Blob>({
    mutationFn: detectApi,
    onSuccess: data => {
      setDetectResult(data);
    },
  });

  const handleCapture = (imageSrc: Maybe<string>) => {
    if (!imageSrc) return;

    const blob = b64toBlob(imageSrc);

    mutation.mutate(blob);
  };

  return (
    <Box w={'full'}>
      <Text fontSize={'xl'}>Welcome home</Text>
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
