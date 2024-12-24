import { Text, useBreakpointValue } from '@chakra-ui/react';

export default function Logo() {
  const fontSize = useBreakpointValue({ base: '2xl', sm: '3xl', md: '4xl' }) ?? '2xl';

  return (
    <Text fontSize={fontSize} fontWeight="700" color="#4CAF50" lineHeight="1">
      IPS-Grow
    </Text>
  );
}
