import { Box, Center, HStack, Icon, Popover, Text, VStack } from '@chakra-ui/react';
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
    <Popover.Root open={isOpen} onOpenChange={e => !e.open && onClose()} positioning={{ placement: 'top' }}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content
          bg="brand.green.light"
          rounded="2xl"
          h="8.5rem"
          w="23rem"
          css={{ '--arrow-background': 'colors.brand.green.light' }}
        >
          <Popover.Arrow />
          <Popover.Body p={0} h="full">
            <Box
              h="full"
              css={{
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
              <HStack w="full" h="full" justifyContent="space-evenly" gap={5}>
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
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
