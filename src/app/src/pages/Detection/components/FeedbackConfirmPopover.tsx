import {
  Box,
  Center,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  return (
    <Popover onClose={onClose} isOpen={isOpen} placement="top">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent bg="brand.green.light" rounded="2xl" h="8.5rem" w="23rem">
        <PopoverArrow bg="brand.green.light" />
        <PopoverBody p={0} h="full">
          <Box
            h="full"
            sx={{
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: '70%',
                background: 'brand.green.40',
                borderLeftRadius: '80px',
                borderRightRadius: '2xl',
              },
            }}
          >
            <HStack w="full" h="full" justifyContent="space-evenly" spacing={5}>
              <VStack align="start">
                <Text fontSize="lg" fontWeight={400}>
                  Thank you!
                </Text>
                <Text fontWeight={400}>Your feedback has been sent.</Text>
              </VStack>
              <Center h="full">
                <Icon color="white" zIndex={1} fontSize="7xl" as={isAccept ? BiSolidLike : BiSolidDislike} />
              </Center>
            </HStack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
