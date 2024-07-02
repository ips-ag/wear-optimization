import { Box } from '@chakra-ui/react';
import { useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: 'environment',
};

export default function TakeImage() {
  // const [imageSrc, setImageSrc] = useState<Maybe<string>>(null);
  const webcamRef = useRef<Webcam>(null);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current?.getScreenshot?.();
  //   setImageSrc(imageSrc);
  // }, [webcamRef]);

  return (
    <Box w="full" h="full">
      <Webcam
        width={'100%'}
        height={'100%'}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
    </Box>
  );
}
