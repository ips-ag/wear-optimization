import { Box } from '@chakra-ui/react';

interface CameraBorderProps {
  edgeSize: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
}
export default function CameraBorder({ edgeSize, borderColor, borderRadius, borderWidth }: CameraBorderProps) {
  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        w={edgeSize}
        h={edgeSize}
        borderLeft={`${borderWidth} solid`}
        borderTop={`${borderWidth} solid`}
        borderColor={borderColor}
        borderRadius={`${borderRadius} 0 0 0`}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="0"
        right="0"
        w={edgeSize}
        h={edgeSize}
        borderRight={`${borderWidth} solid`}
        borderTop={`${borderWidth} solid`}
        borderColor={borderColor}
        borderRadius={`0 ${borderRadius} 0 0`}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w={edgeSize}
        h={edgeSize}
        borderLeft={`${borderWidth} solid`}
        borderBottom={`${borderWidth} solid`}
        borderColor={borderColor}
        borderRadius={`0 0 0 ${borderRadius}`}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="0"
        right="0"
        w={edgeSize}
        h={edgeSize}
        borderRight={`${borderWidth} solid`}
        borderBottom={`${borderWidth} solid`}
        borderColor={borderColor}
        borderRadius={`0 0 ${borderRadius} 0`}
        pointerEvents="none"
      />
    </>
  );
}
