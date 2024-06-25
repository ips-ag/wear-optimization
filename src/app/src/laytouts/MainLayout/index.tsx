import Navbar from '@/components/Navbar';
import { Box } from '@chakra-ui/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box w={'full'}>
      <Navbar />
      {children}
    </Box>
  );
}
