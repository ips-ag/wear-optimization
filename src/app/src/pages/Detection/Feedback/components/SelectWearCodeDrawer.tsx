import { WearCode } from '@/types';
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent pb={12}>
        <DrawerCloseButton />
        <DrawerHeader>Select wear patterns</DrawerHeader>
        <DrawerBody>
          <VStack w="full" h="full" spacing={0}>
            {Object.keys(WearCode)
              .filter(item => isNaN(Number(item)) && item !== 'none')
              .map((key: string) => (
                <>
                  <WearCodeCard key={key} wearCodeName={key} onSelect={onSelect} />
                  <Divider key={key} />
                </>
              ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
