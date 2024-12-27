import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';

export default function MainLayout() {
  return (
    <Box minH="100vh" bg="gray.50" pb="56px">
      <Box bg="white" borderBottom="1px" borderColor="gray.100" position="sticky" top={0} zIndex={1000}>
        <Container maxW="container.lg" p={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md" color="brand.green.primary">
              IPS Grow
            </Heading>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.lg" p={4}>
        <Outlet />
      </Container>
      <BottomNavigation />
    </Box>
  );
}
