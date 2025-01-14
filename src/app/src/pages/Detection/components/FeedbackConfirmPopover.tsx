import {
  Box,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

const MotionModalContent = motion(ModalContent);

interface FeedbackPopoverProps {
  isAccept?: boolean;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackConfirmPopover({ children, isOpen, onClose, isAccept }: FeedbackPopoverProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {children}
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <AnimatePresence>
          {isOpen && (
            <MotionModalContent
              bg="transparent"
              boxShadow="none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ModalBody p={0}>
                <Center w="full">
                  <Box bg="white" rounded="2xl" overflow="hidden" w="300px" position="relative" boxShadow="xl">
                    <HStack w="full" h="120px" spacing={0} position="relative" bg="brand.green.light">
                      <VStack flex={2} align="start" p={4} spacing={1}>
                        <Text fontSize="xl" fontWeight="600" color="gray.800">
                          Thank you!
                        </Text>
                        <Text color="gray.600">Your feedback has been sent.</Text>
                      </VStack>

                      <Center flex={1} h="full" bg="brand.green.40" position="relative">
                        <Icon as={isAccept ? BiSolidLike : BiSolidDislike} color="white" fontSize="4xl" zIndex={1} />
                        <Box
                          position="absolute"
                          left="-30px"
                          top={0}
                          bottom={0}
                          width="60px"
                          bg="brand.green.40"
                          transform="skew(-10deg)"
                        />
                      </Center>
                    </HStack>
                  </Box>
                </Center>
              </ModalBody>
            </MotionModalContent>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
