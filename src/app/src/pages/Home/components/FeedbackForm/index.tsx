import feedbackApi from '@/api/feedback';
import { FeedbackRequest, FeedbackResponseModel, WearCode, wearCodeNameMap } from '@/types';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FeedbackSchema = z
  .object({
    detectedWearAccepted: z.boolean(),
    userWearCode: z.string(),
    userComment: z.string().refine(value => value.length <= 500, {
      message: 'Comment must be less than 500 characters',
    }),
  })
  .refine(data => data.detectedWearAccepted || (!data.detectedWearAccepted && data.userWearCode !== String(0)), {
    message: 'Wear code is required',
    path: ['userWearCode'],
  });

type FeedbackFormType = z.infer<typeof FeedbackSchema>;

interface FeedbackFormProps {
  imageName: string;
}

export default function FeedbackForm({ imageName }: FeedbackFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(FeedbackSchema),
  });
  const toast = useToast();

  const { mutate, isPending } = useMutation<FeedbackResponseModel, Error, FeedbackRequest>({
    mutationFn: feedbackApi,
    onSuccess: () => {
      toast({
        title: 'Feedback submitted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: error => {
      toast({
        title: 'Failed to submit feedback',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmitFeedback = (data: FeedbackFormType) => {
    const feedbackData: FeedbackRequest = {
      imageName,
      detectedWearAccepted: data.detectedWearAccepted,
      userWearCode: WearCode[data.userWearCode as keyof typeof WearCode],
      userComment: data.userComment,
    };
    mutate(feedbackData);
  };

  return (
    <Box w="full">
      <form onSubmit={handleSubmit(onSubmitFeedback)}>
        <VStack w="full" spacing={4} shadow="md" rounded="md" p={5}>
          <FormControl>
            <Checkbox size="lg" {...register('detectedWearAccepted')} colorScheme="green">
              Accept detected wear
            </Checkbox>
          </FormControl>
          <FormControl isInvalid={!!errors.userWearCode}>
            <FormLabel htmlFor="userWearCode">Wear code</FormLabel>
            <Select {...register('userWearCode')} id="userWearCode">
              {Object.entries(wearCodeNameMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.userWearCode?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.userComment?.message}>
            <FormLabel htmlFor="userComment">Comment</FormLabel>
            <Textarea {...register('userComment')} id="userComment" />
            <FormErrorMessage>{errors.userComment?.message}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="green" disabled={!isValid} type="submit" isLoading={isPending}>
            Submit feedback
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
