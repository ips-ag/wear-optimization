import Navbar from '@/components/Navbar';
import { getWearCodeName, getWearImagePath } from '@/helpers';
import { resultSelector, selectedImage } from '@/store';
import { Divider, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../hooks/useFeedback';
import FeedbackThumb from './components/FeedbackThumb';
import ImageSlider from './components/ImageSlider';

export default function ResultPage() {
  const detectResult = useAtomValue(resultSelector);
  const imageFile = useAtomValue(selectedImage);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [sliderImages, setSliderImages] = useState<string[]>([]);

  console.log('sliderImages', sliderImages);

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

  useEffect(() => {
    const wearPhoto = getWearImagePath('photo', detectResult?.wearCode?.toString());
    const wearDrawing = getWearImagePath('drawing', detectResult?.wearCode?.toString());
    const images = [imageSrc, wearPhoto, wearDrawing].filter(item => !!item) as string[];
    setSliderImages(images);
  }, [imageSrc, detectResult?.wearCode]);

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
      <ImageSlider wearConfident={detectResult?.wearConfidence} images={sliderImages} />
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
