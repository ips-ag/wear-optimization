import CameraCapture from '@/components/CameraCapture';
import { DetectResponseModel } from '@/types';
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
  const [detectResult, setDetectResult] = useState(undefined as DetectResponseModel | undefined);
  const [imageUri, setImageUri] = useState(undefined as string | undefined);

  return (
    <Box>
      <Text fontSize={'xl'}>Welcome home</Text>
      <CameraCapture />
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </Box>
  );
}
