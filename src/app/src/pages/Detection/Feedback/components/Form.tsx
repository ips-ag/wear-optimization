import { FeedbackRequest, WearCode } from '@/types';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RiSendPlaneFill } from 'react-icons/ri';
import { z } from 'zod';
import { useFeedback } from '../../hooks/useFeedback';
import SelectWearCodeDrawer from './SelectWearCodeDrawer';
import WearCodeCard from './WearCodeCard';
import FeedbackConfirmPopover from '../../components/FeedbackConfirmPopover';
import { useEffect } from 'react';

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
  disabled?: boolean;
}
export default function FeedbackForm({ imageName, disabled }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(FeedbackSchema),
  });
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
  const {
    isOpen: isOpenFeedbackConfirm,
    onOpen: onOpenFeedbackConfirm,
    onClose: onCloseFeedbackConfirm,
  } = useDisclosure();
  const userWearCode = watch('userWearCode');
  const isSetWearCode = Boolean(userWearCode);
  const { mutate, isPending, isSuccess } = useFeedback();

  useEffect(() => {
    if (isSuccess) {
      onOpenFeedbackConfirm();
    }
  }, [isSuccess, onOpenFeedbackConfirm]);

  const onSubmitFeedback = (data: FeedbackFormType) => {
    const feedbackData: FeedbackRequest = {
      imageName,
      detectedWearAccepted: data.detectedWearAccepted,
      userWearCode: WearCode[data.userWearCode as keyof typeof WearCode],
      userComment: data.userComment,
    };
    mutate(feedbackData);
  };

  const handleSelectWearCode = (wearCode: string): void => {
    setValue('userWearCode', String(WearCode[wearCode as keyof typeof WearCode]), { shouldValidate: true });
    onCloseDrawer();
  };

  return (
    <Box w="full" h="full">
      <form onSubmit={handleSubmit(onSubmitFeedback)}>
        <VStack w="full" h="full " spacing={4} align="start">
          <FormControl isInvalid={!!errors.userWearCode}>
            <FormLabel color="brand.green.primary" htmlFor="userWearCode">
              Wear pattern
            </FormLabel>
            {isSetWearCode && <WearCodeCard wearCodeName={WearCode[Number(userWearCode)]} />}
            <Button
              color="brand.green.primary"
              borderColor="brand.green.primary"
              variant="outline"
              onClick={onOpenDrawer}
            >
              {isSetWearCode ? 'Change wear pattern' : 'Select wear pattern'}
            </Button>
            <FormErrorMessage>{errors.userWearCode?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.userComment?.message}>
            <FormLabel color="brand.green.primary" htmlFor="userComment">
              Comment
            </FormLabel>
            <Textarea {...register('userComment')} id="userComment" />
            <FormErrorMessage>{errors.userComment?.message}</FormErrorMessage>
          </FormControl>
          <FeedbackConfirmPopover isOpen={isOpenFeedbackConfirm} onClose={onCloseFeedbackConfirm}>
            <Button
              leftIcon={<RiSendPlaneFill />}
              bg="brand.green.primary"
              color="white"
              type="submit"
              isLoading={isPending}
              isDisabled={disabled || isPending}
              _hover={{ bg: 'brand.green.70' }}
            >
              Submit feedback
            </Button>
          </FeedbackConfirmPopover>
        </VStack>
      </form>
      <SelectWearCodeDrawer onSelect={handleSelectWearCode} isOpen={isOpenDrawer} onClose={onCloseDrawer} />
    </Box>
  );
}
