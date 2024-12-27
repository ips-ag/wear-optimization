import { Box, IconButton, Popover, PopoverContent, PopoverTrigger, Text, VStack } from '@chakra-ui/react';
import { BiMessageAltDetail } from 'react-icons/bi';
import FeedbackThumb from './FeedbackThumb';

interface Props {
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export default function FloatingFeedbackButton({ onAccept, onReject, disabled }: Props) {
  return (
    <Box position="fixed" bottom="24px" right="20px" zIndex={1000}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Feedback"
            icon={<BiMessageAltDetail size={24} />}
            colorScheme="green"
            size="lg"
            rounded="full"
            w="56px"
            h="56px"
            boxShadow="lg"
            _hover={{
              transform: 'scale(1.05)',
            }}
            transition="all 0.2s"
          />
        </PopoverTrigger>
        <PopoverContent p={4} width="auto" maxW="300px">
          <VStack spacing={4} align="center">
            <VStack spacing={1}>
              <Text fontSize="lg" fontWeight="600" color="gray.800">
                Is this analysis correct?
              </Text>
              <Text textAlign="center" color="gray.600" fontSize="sm">
                Help us improve by providing your feedback
              </Text>
            </VStack>
            <FeedbackThumb onAccept={onAccept} onReject={onReject} disabled={disabled} />
          </VStack>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
