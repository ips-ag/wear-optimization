import { Box, Center, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Logo from '../Logo';

const MotionBox = motion(Box);

interface AnimatedDotProps {
  color: string;
  delay: number;
}

const AnimatedDot = ({ color, delay }: AnimatedDotProps) => (
  <MotionBox
    w="1rem"
    h="1rem"
    bg={color}
    borderRadius="full"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{
      duration: 1,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: delay,
    }}
  />
);

export function Loading() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.700"
      backdropFilter="blur(8px)"
      zIndex={2000}
    >
      <Center h="full">
        <VStack bg="white" p={8} rounded="2xl" spacing={6} shadow="xl" maxW="sm" mx={4}>
          <Logo />

          <SimpleGrid columns={4} spacing={3}>
            <AnimatedDot color="brand.green.primary" delay={0} />
            <AnimatedDot color="brand.green.primary" delay={0.2} />
            <AnimatedDot color="brand.green.primary" delay={0.4} />
            <AnimatedDot color="brand.green.primary" delay={0.6} />
          </SimpleGrid>

          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="600" color="gray.800">
              Processing
            </Text>
            <Text textAlign="center" fontSize="sm" color="gray.600" px={4}>
              We're analyzing the picture to identify wear patterns.
              <br />
              This will take just a moment.
            </Text>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
}
