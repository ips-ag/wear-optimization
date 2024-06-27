import { Maybe } from '@/types';
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CaptureImageProps {
  onCapture: (imageSrc: Maybe<string>) => void;
  isOpen: boolean;
  onClose: () => void;
}
export default function CaptureImage({ onCapture, isOpen, onClose }: CaptureImageProps) {
  const [currentDeviceId, setCurrentDeviceId] = useState<string>();
  const [imageSrc, setImageSrc] = useState<Maybe<string>>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(mediaDevices => {
      const supportDevices = mediaDevices.filter(item => item.kind === 'videoinput');
      console.log(supportDevices);
      if (supportDevices.length > 0) {
        setCurrentDeviceId(supportDevices[0].deviceId);
      }
    });
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: { exact: 'environment' },
          deviceId: currentDeviceId,
          width: 1280,
          height: 720,
        },
      })
      .then(stream => {
        console.log(stream);
        stream.getTracks().forEach(track => {
          track.stop();
        });
      });
  }, [currentDeviceId]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot?.();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Capture Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Box border={1} borderStyle={'dashed'} borderColor={'grey.100'} rounded={'sm'}>
              {imageSrc && <Image src={imageSrc} />}
              {!imageSrc && (
                <Webcam
                  width={'100%'}
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={{
                    facingMode: { exact: 'environment' },
                    deviceId: currentDeviceId,
                    width: 1280,
                    height: 720,
                  }}
                  onUserMedia={() => {
                    console.log('onUserMedia');
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
