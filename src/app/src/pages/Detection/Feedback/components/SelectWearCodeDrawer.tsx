import { WearCode } from '@/types';
import {
  Drawer,
  Portal,
  Separator,
  VStack,
} from '@chakra-ui/react';
import WearCodeCard from './WearCodeCard';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  onSelect: (wearCode: string) => void;
}

// 45px to rem =
export default function SelectWearCodeDrawer({ onClose, isOpen, onSelect }: Props) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="full">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content pb={12} height="100%">
            <Drawer.CloseTrigger />
            <Drawer.Header>Select wear patterns</Drawer.Header>
            <Drawer.Body>
              <VStack w="full" h="full" gap={0}>
                {Object.keys(WearCode)
                  .filter(item => isNaN(Number(item)) && item !== 'none')
                  .map((key: string) => (
                    <>
                      <WearCodeCard key={key} wearCodeName={key} onSelect={onSelect} />
                      <Separator key={key} />
                    </>
                  ))}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
