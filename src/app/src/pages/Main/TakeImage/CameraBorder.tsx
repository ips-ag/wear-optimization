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
        borderLeft={`${borderWidth} solid ${borderColor}`}
        borderTop={`${borderWidth} solid ${borderColor}`}
        borderRadius={`${borderRadius} 0 0 0`}
      />
      <Box
        position="absolute"
        top="0"
        right="0"
        w={edgeSize}
        h={edgeSize}
        borderRight={`${borderWidth} solid ${borderColor}`}
        borderTop={`${borderWidth} solid ${borderColor}`}
        borderRadius={`0 ${borderRadius} 0 0`}
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w={edgeSize}
        h={edgeSize}
        borderLeft={`${borderWidth} solid ${borderColor}`}
        borderBottom={`${borderWidth} solid ${borderColor}`}
        borderRadius={`0 0 0 ${borderRadius}`}
      />
      <Box
        position="absolute"
        bottom="0"
        right="0"
        w={edgeSize}
        h={edgeSize}
        borderRight={`${borderWidth} solid ${borderColor}`}
        borderBottom={`${borderWidth} solid ${borderColor}`}
        borderRadius={`0 0 ${borderRadius} 0`}
      />
    </>
  );
}
