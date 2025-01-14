import { Box, Container, HStack, Icon, Link, Text } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiHistory } from 'react-icons/bi';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <Box position="fixed" bottom={0} left={0} right={0} bg="white" borderTop="1px" borderColor="gray.100" zIndex={1000}>
      <Container maxW="container.lg" p={0}>
        <HStack h="56px" justify="space-around">
          <Link
            as={RouterLink}
            to="/"
            display="flex"
            flexDir="column"
            alignItems="center"
            textDecoration="none"
            color={location.pathname === '/' ? 'brand.green.primary' : 'gray.500'}
          >
            <Icon as={AiOutlineHome} boxSize={5} />
            <Text fontSize="xs">Home</Text>
          </Link>
          <Link
            as={RouterLink}
            to="/history"
            display="flex"
            flexDir="column"
            alignItems="center"
            textDecoration="none"
            color={location.pathname === '/history' ? 'brand.green.primary' : 'gray.500'}
          >
            <Icon as={BiHistory} boxSize={5} />
            <Text fontSize="xs">History</Text>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
}
