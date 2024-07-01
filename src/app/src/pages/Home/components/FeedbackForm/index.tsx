import feedbackApi from '@/api/feedback';
import { FeedbackRequest, FeedbackResponseModel, WearCode, wearCodeNameMap } from '@/types';
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Select, Textarea, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@chakra-ui/react';

const FeedbackSchema = z
  .object({
    detectedWearAccepted: z.boolean(),
    userWearCode: z.string(),
    userComment: z.string().refine(value => value.length > 0, {
      message: 'Comment is required',
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
    formState: { errors },
  } = useForm<FeedbackFormType>({
    resolver: zodResolver(FeedbackSchema),
  });
  const toast = useToast();

  const { mutate, isPending,  } = useMutation<FeedbackResponseModel, Error, FeedbackRequest>({
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
    console.log('errors', errors);
    console.log('data', data);
    const feedbackData: FeedbackRequest = {
      imageName,
      detectedWearAccepted: data.detectedWearAccepted,
      userWearCode: WearCode[data.userWearCode as keyof typeof WearCode],
      userComment: data.userComment,
    };
    mutate(feedbackData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFeedback)}>
      <VStack spacing={4} shadow="md" rounded="md" p={5}>
        <FormControl>
          <Checkbox {...register('detectedWearAccepted')} colorScheme="green">
            Accepted detected wear
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
        <Button colorScheme="green" type="submit" isLoading={isPending}>
          Submit feedback
        </Button>
      </VStack>
    </form>
  );
}
