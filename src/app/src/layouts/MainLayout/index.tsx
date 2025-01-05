import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Box minH="100vh" bg="gray.50" pb="56px" pt="12">
      <Container maxW="container.lg" p={4}>
        <Outlet />
      </Container>
    </Box>
  );
}
