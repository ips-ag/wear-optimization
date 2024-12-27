import { Maybe } from '@/types';
import { Box, Container, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import InstallButton from '../InstallButton';
import Logo from '../Logo';

interface NavbarProps {
  showBack?: boolean;
  backPath?: string;
  title?: Maybe<string>;
  showLogo?: boolean;
}

export default function Navbar({ showBack = false, backPath = '/', title, showLogo = false }: NavbarProps) {
  return (
    <Box position="fixed" top={0} left={0} right={0} bg="white" borderBottom="1px" borderColor="gray.100" zIndex={1000}>
      <Container maxW="container.lg" px={4}>
        <Flex h="56px" alignItems="center" justifyContent="space-between">
          <HStack spacing={3}>
            {showBack && (
              <IconButton
                as={Link}
                to={backPath}
                icon={<IoIosArrowBack size={24} />}
                variant="ghost"
                aria-label="Back"
                rounded="full"
              />
            )}
            {showLogo && <Logo />}
            {title && (
              <Text fontSize="lg" fontWeight="600">
                {title}
              </Text>
            )}
          </HStack>
          <InstallButton />
        </Flex>
      </Container>
    </Box>
  );
}
