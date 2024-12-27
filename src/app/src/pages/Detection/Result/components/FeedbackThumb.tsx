import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

interface Props {
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export default function FeedbackThumb({ onAccept, onReject, disabled }: Props) {
  return (
    <HStack spacing={4}>
      <Tooltip label="Yes, it's correct" hasArrow>
        <IconButton
          onClick={onAccept}
          rounded="full"
          size="lg"
          w="4rem"
          h="4rem"
          bg="brand.green.primary"
          fontSize="2xl"
          color="white"
          aria-label="accept"
          icon={<BiSolidLike size={24} />}
          _hover={{
            bg: 'brand.green.70',
            transform: 'scale(1.05)',
          }}
          _active={{
            transform: 'scale(0.95)',
          }}
          transition="all 0.2s"
          isDisabled={disabled}
        />
      </Tooltip>

      <Tooltip label="No, needs correction" hasArrow>
        <IconButton
          onClick={onReject}
          rounded="full"
          size="lg"
          w="4rem"
          h="4rem"
          bg="gray.100"
          color="gray.600"
          fontSize="2xl"
          aria-label="reject"
          icon={<BiSolidDislike size={24} />}
          _hover={{
            bg: 'gray.200',
            transform: 'scale(1.05)',
          }}
          _active={{
            transform: 'scale(0.95)',
          }}
          transition="all 0.2s"
          isDisabled={disabled}
        />
      </Tooltip>
    </HStack>
  );
}
