import Navbar from '@/components/Navbar';
import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const isDetectPage = location.pathname === '/detect/';

  return (
    <Box w="full" h="full">
      {!isDetectPage && <Navbar />}
      {children}
    </Box>
  );
}
