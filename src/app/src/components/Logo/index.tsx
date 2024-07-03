import { Box, Center, Image } from '@chakra-ui/react';
import WalterLogo from '../../assets/images/walter-logo.png';

export default function Logo() {
  return (
    <Box w={'full'}>
      <Center w="full" h="max" p="3">
        <Image src={WalterLogo} maxW="158px" />
      </Center>
    </Box>
  );
}
