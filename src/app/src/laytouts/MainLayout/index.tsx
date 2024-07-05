import Logo from '@/components/Logo';
import { VStack } from '@chakra-ui/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <VStack w="full" h="full" spacing={0}>
      <Logo />
      {children}
    </VStack>
  );
}
