import Navbar from '@/components/Navbar';
import { getWearCodeName, getWearImagePath } from '@/helpers';
import { historyService } from '@/services/history';
import { resultSelector, selectedImage } from '@/store';
import { Box, HStack, Icon, ListItem, OrderedList, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { MdOutlineHandyman } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackConfirmPopover from '../components/FeedbackConfirmPopover';
import { useFeedback } from '../hooks/useFeedback';
import FloatingFeedbackButton from './components/FloatingFeedbackButton';
import ImageSlider from './components/ImageSlider';

export default function ResultPage() {
  const { id } = useParams();
  const detectResult = useAtomValue(resultSelector);
  const imageFile = useAtomValue(selectedImage);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isSuccess, isPending } = useFeedback();
  const navigate = useNavigate();

  const { data: historyItem } = useQuery({
    queryKey: ['analysis', id],
    queryFn: () => (id ? historyService.getAnalysisById(id) : null),
    enabled: !!id,
  });

  const result = historyItem?.result || detectResult;

  useEffect(() => {
    if (historyItem?.imageSrc) {
      setImageSrc(historyItem.imageSrc);
    } else if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = e.target?.result;
        setImageSrc(image as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile, historyItem?.imageSrc]);

  useEffect(() => {
    if (isSuccess) {
      onOpen();
    }
  }, [isSuccess, onOpen]);

  useEffect(() => {
    const wearPhoto = getWearImagePath('photo', result?.wearCode?.toString());
    const wearDrawing = getWearImagePath('drawing', result?.wearCode?.toString());

    if (!wearPhoto) {
      console.warn(`Photo not found for wear code: ${result?.wearCode}`);
    }

    const images = [imageSrc, wearPhoto, wearDrawing].filter(Boolean) as string[];
    setSliderImages(images);
  }, [imageSrc, result?.wearCode]);

  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const analysisId = id || currentId;

  useEffect(() => {
    if (detectResult && imageSrc && !analysisId) {
      const saveAnalysis = async () => {
        const newId = await historyService.addAnalysis(imageSrc, detectResult);
        setCurrentId(newId);
      };
      saveAnalysis();
    }
  }, [detectResult, imageSrc, analysisId]);

  const { data: hasFeedback } = useQuery({
    queryKey: ['feedback', analysisId],
    queryFn: () => (analysisId ? historyService.hasFeedback(analysisId) : false),
    enabled: !!analysisId,
  });

  const handleAccept = async () => {
    if (analysisId) {
      await historyService.updateFeedback(analysisId, true);
      onOpen();
    }
  };

  const handleReject = () => {
    if (analysisId) {
      navigate(`/feedback/${analysisId}`);
    }
  };

  return (
    <Box w="full" h="full" bg="gray.50">
      <Navbar backPath="/" title={getWearCodeName(result?.wearCode?.toString())} showBack />

      {/* Image Slider Section */}
      <Box bg="white" mb={4}>
        <ImageSlider wearConfident={result?.wearConfidence} images={sliderImages} />
      </Box>

      {/* Content Sections */}
      <VStack w="full" spacing={4} px={4} pb={24}>
        {/* Description Card */}
        <Box w="full" bg="white" rounded="xl" overflow="hidden" shadow="sm">
          <HStack bg="brand.green.light" px={4} py={3} spacing={3}>
            <Icon as={BiInfoCircle} color="brand.green.primary" fontSize="xl" />
            <Text color="brand.green.primary" fontSize="lg" fontWeight="600">
              Description
            </Text>
          </HStack>

          <Box p={4}>
            <Text color="gray.700" lineHeight="tall">
              {result?.wearCause}
            </Text>
          </Box>
        </Box>

        <Box w="full" bg="white" rounded="xl" overflow="hidden" shadow="sm">
          <HStack bg="brand.green.light" px={4} py={3} spacing={3}>
            <Icon as={MdOutlineHandyman} color="brand.green.primary" fontSize="xl" />
            <Text color="brand.green.primary" fontSize="lg" fontWeight="600">
              Recommended Actions
            </Text>
          </HStack>

          <Box p={4}>
            <OrderedList spacing={3}>
              {result?.suggestedActions.map((action, index) => (
                <ListItem key={index}>
                  <Text color="gray.700" lineHeight="tall">
                    {action}
                  </Text>
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        </Box>
      </VStack>

      {/* Feedback Button */}
      <FeedbackConfirmPopover isOpen={isOpen} onClose={onClose} isAccept>
        <FloatingFeedbackButton
          onAccept={handleAccept}
          onReject={handleReject}
          disabled={!analysisId || isPending || hasFeedback}
        />
      </FeedbackConfirmPopover>
    </Box>
  );
}
