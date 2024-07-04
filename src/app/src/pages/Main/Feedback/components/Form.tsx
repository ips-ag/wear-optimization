import { FeedbackRequest, WearCode } from '@/types';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RiSendPlaneFill } from 'react-icons/ri';
import { z } from 'zod';
import { useFeedback } from '../../hooks/useFeedback';
import SelectWearCodeDrawer from './SelectWearCodeDrawer';
import WearCodeCard from './WearCodeCard';

const FeedbackSchema = z
  .object({
    detectedWearAccepted: z.boolean().default(false),
    userWearCode: z.string(),
    userComment: z.string().refine(value => value.length <= 500, {
      message: 'Comment must be less than 500 characters',
    }),
  })
  .refine(data => data.detectedWearAccepted || (!data.detectedWearAccepted && Boolean(data.userWearCode)), {
    message: 'Wear code is required',
    path: ['userWearCode'],
  });

type FeedbackFormType = z.infer<typeof FeedbackSchema>;

interface Props {
  imageName: string;
}
export default function FeedbackForm({ imageName }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(FeedbackSchema),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userWearCode = watch('userWearCode');
  const isSetWearCode = Boolean(userWearCode);
  const { mutate, isPending } = useFeedback();

  const onSubmitFeedback = (data: FeedbackFormType) => {
    const feedbackData: FeedbackRequest = {
      imageName,
      detectedWearAccepted: data.detectedWearAccepted,
      userWearCode: WearCode[data.userWearCode as keyof typeof WearCode],
      userComment: data.userComment,
    };
    mutate(feedbackData);
  };

  function handleSelectWearCode(wearCode: string): void {
    setValue('userWearCode', String(WearCode[wearCode as keyof typeof WearCode]), { shouldValidate: true });
    onClose();
  }

  return (
    <Box w="full" h="full">
      <form onSubmit={handleSubmit(onSubmitFeedback)}>
        <VStack w="full" h="full " spacing={4} align="start">
          <FormControl isInvalid={!!errors.userWearCode}>
            <FormLabel color="green" htmlFor="userWearCode">
              Wear pattern
            </FormLabel>
            {isSetWearCode && <WearCodeCard wearCodeName={WearCode[Number(userWearCode)]} />}
            <Button colorScheme="green" variant="outline" onClick={onOpen}>
              {isSetWearCode ? 'Change wear pattern' : 'Select wear pattern'}
            </Button>
            <FormErrorMessage>{errors.userWearCode?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.userComment?.message}>
            <FormLabel color="green" htmlFor="userComment">
              Comment
            </FormLabel>
            <Textarea {...register('userComment')} id="userComment" />
            <FormErrorMessage>{errors.userComment?.message}</FormErrorMessage>
          </FormControl>
          <Button
            leftIcon={<RiSendPlaneFill />}
            colorScheme="green"
            disabled={!isValid}
            type="submit"
            isLoading={isPending}
          >
            Submit feedback
          </Button>
        </VStack>
      </form>
      <SelectWearCodeDrawer onSelect={handleSelectWearCode} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
