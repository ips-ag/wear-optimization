import {
  Box,
  Center,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

interface Props {
  onAccept: () => void;
  onReject: () => void;
}
export default function FeedbackThumb({ onAccept, onReject }: Props) {
  return (
    <Center w="full" mt="auto">
      <HStack bg="brand.green.light" h="3.75rem" w="8rem" borderRadius="2rem 2rem 0px 0px" justifyContent="center">
        <Popover placement="top">
          <PopoverTrigger>
            <IconButton
              onClick={onAccept}
              rounded="full"
              w="3rem"
              h="3rem"
              bg="brand.green.primary"
              fontSize="2xl"
              color="white"
              aria-label="accept"
              icon={<BiSolidLike />}
              _hover={{ bg: 'green' }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Box bg="brand.green.light">
                <HStack>
                  <VStack>
                    <Text>Thank you!</Text>
                    <Text>Your feedback has been sent.</Text>
                  </VStack>
                  <Box bg="brand.green.40"></Box>
                </HStack>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton
          onClick={onReject}
          rounded="full"
          w="3rem"
          h="3rem"
          bg="brand.grey.4"
          color="brand.grey.1"
          fontSize="2xl"
          aria-label="accept"
          icon={<BiSolidDislike />}
          _hover={{ bg: 'brand.grey.4' }}
        />
      </HStack>
    </Center>
  );
}
