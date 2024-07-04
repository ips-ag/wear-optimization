import { Maybe } from '@/types';
import { Box, Center, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface NavbarProps {
  backPath: string;
  title?: Maybe<string>;
}
export default function Navbar({ backPath, title }: NavbarProps) {
  return (
    <Box w={'full'} h="min">
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <Center
            as={Link}
            to={backPath}
            _hover={{ bg: 'white' }}
            rounded="full"
            p={0}
            fontSize={'xl'}
            aria-label="back"
            bg="none"
          >
            <Icon as={IoIosArrowBack} />
          </Center>
          <Text align="center" fontSize={'xl'} fontWeight="700">
            {title}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
