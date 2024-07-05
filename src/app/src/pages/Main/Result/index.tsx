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
  VStack
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useFeedback } from '../hooks/useFeedback';
import AccurateTooltip from './components/AccurateTooltip';

export default function ResultPage() {
  const detectResult = useAtomValue(resultSelector);
  const imageFile = useAtomValue(selectedImage);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const { mutate } = useFeedback();

  const accurateConfidence = Number(((detectResult?.wearConfidence ?? 0) * 100).toFixed(0));
  // >80% green, >50% yellow, otherwise red text color
  const accurateConfidenceColor =
    accurateConfidence > 80
      ? 'brand.green.primary'
      : accurateConfidence > 50
        ? 'brand.yellow.primary'
        : 'brand.red.primary';

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = e.target?.result;
        setImageSrc(image as string);
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
    <VStack w="full" h="full" spacing="1">
      <Navbar backPath="/" title={getWearCodeName(detectResult?.wearCode?.toString())} />
      <Image src={imageSrc} alt="result image" w="full" objectFit="cover" fallback={<ImageFallback />} pt="3" />
      <VStack w="full" spacing="2" align="start" px="4">
        <HStack>
          <HStack>
            <HStack spacing={1} color={accurateConfidenceColor}>
              <Text fontWeight={700} fontSize="lg">{`${accurateConfidence}%`}</Text>
              <Text>{'accurate'}</Text>
            </HStack>
            <AccurateTooltip />
          </HStack>
        </HStack>
        <Text color="brand.green.primary" fontSize="lg" mt="4">
          Description
        </Text>
        <Text>{detectResult?.wearCause}</Text>
        <Text color="brand.green.primary" fontSize="lg">
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
        <HStack bg="brand.green.light" h="3.75rem" w="8rem" borderRadius="2rem 2rem 0px 0px" justifyContent="center">
          <Popover placement="top">
            <PopoverTrigger>
              <IconButton
                onClick={handleAccept}
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
            as={Link}
            to="/result/feedback"
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
    </VStack>
  );
}
