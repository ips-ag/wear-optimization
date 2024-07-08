import feedbackApi from '@/api/feedback';
import { feedbackAtom } from '@/store';
import { FeedbackRequest, FeedbackResponseModel } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';

export const useFeedback = () => {
  const toast = useToast();
  const [feedback, setFeedback] = useAtom(feedbackAtom);

  const { mutate, isPending } = useMutation<FeedbackResponseModel, Error, FeedbackRequest>({
    mutationFn: feedbackApi,
    onSuccess: (_, request) => {
      setFeedback({ ...feedback, imageName: request.imageName });
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
