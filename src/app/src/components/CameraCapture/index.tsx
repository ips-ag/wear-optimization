import { Maybe } from '@/types';
import {
  Box,
  Button,
  Dialog,
  HStack,
  Image,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: 'environment',
  width: 540,
};

interface CaptureImageProps {
  onCapture: (imageSrc: Maybe<string>) => void;
  isOpen: boolean;
  onClose: () => void;
}
export default function CaptureImage({ onCapture, isOpen, onClose }: CaptureImageProps) {
  const [imageSrc, setImageSrc] = useState<Maybe<string>>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="xl">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Capture Image</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <VStack>
                <Box border={1} borderStyle={'dashed'} borderColor={'grey.100'} rounded={'sm'}>
                  {imageSrc && <Image src={imageSrc} />}
                  {!imageSrc && (
                    <Webcam
                      width={'100%'}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/png"
                      videoConstraints={videoConstraints}
                      onUserMedia={e => {
                        console.log('onUserMedia', e);
                      }}
                    />
                  )}
                </Box>
                {imageSrc ? (
                  <HStack>
                    <Button onClick={() => onCapture(imageSrc)}>Done</Button>
                    <Button onClick={() => setImageSrc(null)}>Retake</Button>
                  </HStack>
                ) : (
                  <Button onClick={capture}>Capture</Button>
                )}
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
