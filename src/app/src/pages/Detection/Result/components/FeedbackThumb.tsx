import { Center, forwardRef, HStack, IconButton } from '@chakra-ui/react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

interface Props {
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}
const FeedbackThumb = forwardRef<Props, 'div'>((props, ref) => {
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
          icon={<BiSolidLike />}
          _hover={{ bg: 'brand.green.primary' }}
          isDisabled={disabled}
        />
        <IconButton
          onClick={onReject}
          rounded="full"
          w="3rem"
          h="3rem"
          bg="brand.grey.4"
          color="brand.grey.1"
          fontSize="2xl"
          aria-label="accept"
          icon={<BiSolidDislike />}
          _hover={{ bg: 'brand.grey.4' }}
          isDisabled={disabled}
        />
      </HStack>
    </Center>
  );
});

export default FeedbackThumb;
