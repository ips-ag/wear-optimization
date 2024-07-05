import { Center, Icon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export default function AccurateTooltip() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Tooltip hasArrow placement='top' isOpen={isOpen} label="Accuracy of detected wear pattern" fontSize="md">
      <Center as="span" onClick={onToggle}>
        <Icon as={BsFillQuestionCircleFill} color="brand.grey.2" />
      </Center>
    </Tooltip>
  );
}
