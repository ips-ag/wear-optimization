import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.lg" px={4} pt="56px">
        <Outlet />
      </Container>
    </Box>
  );
}
