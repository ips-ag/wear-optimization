import Logo from '@/components/Logo';
import { Center, VStack } from '@chakra-ui/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Center h="full" w="full">
      <VStack h="full" w={['full', 'container.base', 'container.sm', 'container.md']}>
        <Logo />
        {children}
      </VStack>
    </Center>
  );
}
