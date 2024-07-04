import feedbackApi from '@/api/feedback';
import { FeedbackRequest, FeedbackResponseModel } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useFeedback = () => {
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

  return { mutate, isPending };
};
