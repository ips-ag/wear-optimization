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
    w="1.25rem"
    h="1.25rem"
    bg={color}
    borderRadius="full"
    animate={{ y: [0, -10] }}
    transition={{
      duration: 0.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: delay,
    }}
  />
);
export function Loading() {
  return (
    <Box position="absolute" top={0} left={0} width="full" h="full">
      <Box position="absolute" top={0} left={0} width="full" h="full" bg="white" />
      <Box w="full" h="full" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        <Logo />
        <Center h="calc(100% - 10rem)">
          <VStack spacing={0} px={12}>
            <SimpleGrid columns={2} row={2} gap={2} w="3rem" h="3rem">
              <AnimatedDot color="brand.blue.primary" delay={0} />
              <AnimatedDot color="brand.yellow.primary" delay={0.1} />
              <AnimatedDot color="brand.red.primary" delay={0.2} />
              <AnimatedDot color="brand.green.primary" delay={0.3} />
            </SimpleGrid>

            <Text mt={3} textAlign="center" fontWeight={700}>
              Processing
            </Text>
            <Text textAlign="center" fontSize="sm" color="brand.grey.600">
              We're analyzing the picture to identify wear patterns. This will take just a moment.
            </Text>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
}
