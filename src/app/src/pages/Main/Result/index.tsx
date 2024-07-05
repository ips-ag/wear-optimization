import { ImageFallback } from '@/components';
import Navbar from '@/components/Navbar';
import { getWearCodeName } from '@/helpers';
import { resultSelector, selectedImage } from '@/store';
import { Divider, HStack, Image, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../hooks/useFeedback';
import AccurateText from './components/AccurateText';
import AccurateTooltip from './components/AccurateTooltip';
import FeedbackThumb from './components/FeedbackThumb';

export default function ResultPage() {
  const detectResult = useAtomValue(resultSelector);
  const imageFile = useAtomValue(selectedImage);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const { mutate } = useFeedback();
  const navigate = useNavigate();

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

  const handleReject = () => {
    navigate('/result/feedback');
  };

  return (
    <VStack w="full" h="full" spacing="1">
      <Navbar backPath="/" title={getWearCodeName(detectResult?.wearCode?.toString())} />
      <Image src={imageSrc} alt="result image" w="full" objectFit="cover" fallback={<ImageFallback />} pt="3" />
      <VStack w="full" spacing="2" align="start" px="4">
        <HStack>
          <HStack>
            <AccurateText wearConfident={detectResult?.wearConfidence} />
            <AccurateTooltip />
          </HStack>
        </HStack>
      </VStack>
      <VStack w="full" spacing="2" align="start" px="4">
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
      <Divider my={4} />
      <VStack w="full" spacing="2" align="start" px="4" color="brand.grey.1">
        <Text fontSize="lg">Feedback</Text>
        <Text>
          Is the information relevant and correct, or have we misidentified the wear pattern? Please use the feedback
          buttons below to help us improve!
        </Text>
      </VStack>
      <FeedbackThumb onAccept={handleAccept} onReject={handleReject} />
    </VStack>
  );
}
