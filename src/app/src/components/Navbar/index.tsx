import { Box, Flex, Icon, IconButton, Link } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

export default function Navbar() {
  return (
    <Box px={4} shadow={'md'} w={'full'}>
      <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          as={Link}
          href="/"
          icon={<FaHome />}
          variant={'solid'}
          bg={'white'}
          _hover={{ bg: 'white' }}
          p={0}
          fontSize={'xl'}
          aria-label="Home"
        />
      </Flex>
    </Box>
  );
}
