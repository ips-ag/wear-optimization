import { FeedbackRequest, WearCode } from '@/types';
import { Box, Button, Field, Textarea, VStack, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { RiSendPlaneFill } from 'react-icons/ri';
import { z } from 'zod';
import { useFeedback } from '../../hooks/useFeedback';
import SelectWearCodeDrawer from './SelectWearCodeDrawer';
import WearCodeCard from './WearCodeCard';
import FeedbackConfirmPopover from '../../components/FeedbackConfirmPopover';
import { useEffect } from 'react';

const FeedbackSchema = z
  .object({
    detectedWearAccepted: z.boolean(),
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
    control,
    formState: { errors },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      detectedWearAccepted: false,
    },
  });
  const { open: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
  const {
    open: isOpenFeedbackConfirm,
    onOpen: onOpenFeedbackConfirm,
    onClose: onCloseFeedbackConfirm,
  } = useDisclosure();
  const userWearCode = useWatch({ control, name: 'userWearCode' });
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
        <VStack w="full" h="full " gap={4} align="start">
          <Field.Root invalid={!!errors.userWearCode}>
            <Field.Label color="brand.green.primary" htmlFor="userWearCode">
              Wear pattern
            </Field.Label>
            {isSetWearCode && <WearCodeCard wearCodeName={WearCode[Number(userWearCode)]} />}
            <Button
              color="brand.green.primary"
              borderColor="brand.green.primary"
              variant="outline"
              onClick={onOpenDrawer}
            >
              {isSetWearCode ? 'Change wear pattern' : 'Select wear pattern'}
            </Button>
            <Field.ErrorText>{errors.userWearCode?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.userComment?.message}>
            <Field.Label color="brand.green.primary" htmlFor="userComment">
              Comment
            </Field.Label>
            <Textarea {...register('userComment')} id="userComment" />
            <Field.ErrorText>{errors.userComment?.message}</Field.ErrorText>
          </Field.Root>
          <FeedbackConfirmPopover isOpen={isOpenFeedbackConfirm} onClose={onCloseFeedbackConfirm}>
            <Button
              bg="brand.green.primary"
              color="white"
              type="submit"
              loading={isPending}
              disabled={disabled || isPending}
              _hover={{ bg: 'brand.green.70' }}
            >
              <RiSendPlaneFill />
              Submit feedback
            </Button>
          </FeedbackConfirmPopover>
        </VStack>
      </form>
      <SelectWearCodeDrawer onSelect={handleSelectWearCode} isOpen={isOpenDrawer} onClose={onCloseDrawer} />
    </Box>
  );
}
