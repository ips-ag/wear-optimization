import TestImage from '@/assets/images/turningGroovingCraterWear.png';
import Navbar from '@/components/Navbar';
import { getWearCodeName } from '@/helpers';
import { resultSelector } from '@/store';
import {
  Box,
  Center,
  HStack,
  IconButton,
  Image,
  ListItem,
  OrderedList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function ResultPage() {
  const detectResult = useAtom(resultSelector)[0];
  console.log(detectResult);

  return (
    <VStack w="full" h="full" spacing="4" px="4">
      <Navbar backPath="/detect" title={getWearCodeName(detectResult?.wearCode?.toString())} />
      <Image src={TestImage} alt="result image" w="full" />
      <VStack w="full" spacing="2" px="3" mt="4" align="start">
        <Text color="green" fontSize="lg">
          Description
        </Text>
        <Text>{detectResult?.wearCause}</Text>
        <Text color="green" fontSize="lg">
          Actions
        </Text>
        <OrderedList>
          {detectResult?.suggestedActions.map((action, index) => (
            <ListItem key={index}>
              <Text key={index}>{action}</Text>
            </ListItem>
          ))}
        </OrderedList>
      </VStack>
      <Center w="full" mt="auto">
        <HStack bg="#E6F0E6" h="3.75rem" w="8rem" borderRadius="2rem 2rem 0px 0px" justifyContent="center">
          <Popover placement="top">
            <PopoverTrigger>
              <IconButton
                rounded="full"
                w="3rem"
                h="3rem"
                bg="green"
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
                <Box bg="#E6F0E6">
                  <HStack>
                    <VStack>
                      <Text>Thank you!</Text>
                      <Text>Your feedback has been sent.</Text>
                    </VStack>
                    <Box bg="green 40%"></Box>
                  </HStack>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <IconButton
            as={Link}
            to="/result/feedback"
            rounded="full"
            w="3rem"
            h="3rem"
            bg="#D9D9D9"
            color="#666666"
            fontSize="2xl"
            aria-label="accept"
            icon={<BiSolidDislike />}
            _hover={{ bg: '#D9D9D9' }}
          />
        </HStack>
      </Center>
    </VStack>
  );
}
