import { Maybe } from '@/types';
import { Box, Flex, HStack, IconButton, Link, Text } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';

interface NavbarProps {
  backPath: string;
  title?: Maybe<string>;
}
export default function Navbar({ backPath, title }: NavbarProps) {
  return (
    <Box w={'full'} h="min">
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <IconButton
            as={Link}
            href={backPath}
            icon={<IoIosArrowBack />}
            variant={'solid'}
            _hover={{ bg: 'white' }}
            rounded="full"
            p={0}
            fontSize={'lg'}
            aria-label="back"
            bg="none"
          />
          <Text fontSize={'lg'} fontWeight="700">
            {title}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
