import { IconButton } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function FloatingCloseButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      position="fixed"
      top={4}
      right={4}
      zIndex={1000}
      icon={<IoClose size={24} />}
      aria-label="Close"
      onClick={() => navigate(-1)}
      rounded="full"
      bg="blackAlpha.500"
      color="white"
      _hover={{
        bg: 'blackAlpha.600',
      }}
    />
  );
}
