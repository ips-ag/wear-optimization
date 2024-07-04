import { ImageFallback } from '@/components';
import Navbar from '@/components/Navbar';
import { getWearCodeName } from '@/helpers';
import { resultSelector, selectedImage } from '@/store';
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
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useFeedback } from '../hooks/useFeedback';

export default function ResultPage() {
  const detectResult = useAtomValue(resultSelector);
  const imageFile = useAtomValue(selectedImage);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const { mutate } = useFeedback();
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = e.target?.result;
        setImageSrc(image as string);
        console.log('image', image);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleAccept = () => {
    if (detectResult?.imageName) {
      mutate({
        imageName: detectResult?.imageName || '',
        detectedWearAccepted: true,
      });
    }
  };

  return (
    <VStack w="full" h="full" spacing="4" px="4">
      <Navbar backPath="/" title={getWearCodeName(detectResult?.wearCode?.toString())} />
      <Image src={imageSrc} alt="result image" w="full" objectFit="cover" fallback={<ImageFallback />} />
      <VStack w="full" spacing="2" mt="4" align="start">
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
                onClick={handleAccept}
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
