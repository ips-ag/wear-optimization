import { Tooltip } from '@/components/ui/tooltip';
import { Center, Icon, useDisclosure } from '@chakra-ui/react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export default function AccurateTooltip() {
  const { open: isOpen, onToggle } = useDisclosure();

  return (
    <Tooltip showArrow open={isOpen} content="Accuracy of detected wear pattern" positioning={{ placement: 'top' }}>
      <Center as="span" onClick={onToggle}>
        <Icon as={BsFillQuestionCircleFill} color="brand.grey.2" />
      </Center>
    </Tooltip>
  );
}
