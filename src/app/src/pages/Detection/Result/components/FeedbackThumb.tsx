import { Center, HStack, IconButton } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

interface Props {
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}
const FeedbackThumb = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { onAccept, onReject, disabled } = props;
  return (
    <Center w="full" mt="auto" ref={ref}>
      <HStack bg="brand.green.light" h="3.75rem" w="8rem" borderRadius="2rem 2rem 0px 0px" justifyContent="center">
        <IconButton
          onClick={onAccept}
          rounded="full"
          w="3rem"
          h="3rem"
          bg="brand.green.primary"
          fontSize="2xl"
          color="white"
          aria-label="accept"
          _hover={{ bg: 'brand.green.primary' }}
          disabled={disabled}
        >
          <BiSolidLike />
        </IconButton>
        <IconButton
          onClick={onReject}
          rounded="full"
          w="3rem"
          h="3rem"
          bg="brand.grey.4"
          color="brand.grey.1"
          fontSize="2xl"
          aria-label="reject"
          _hover={{ bg: 'brand.grey.4' }}
          disabled={disabled}
        >
          <BiSolidDislike />
        </IconButton>
      </HStack>
    </Center>
  );
});

export default FeedbackThumb;
