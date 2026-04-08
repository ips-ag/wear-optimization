import feedbackApi from '@/api/feedback';
import { feedbackAtom } from '@/store';
import { FeedbackRequest, FeedbackResponseModel } from '@/types';
import { toaster } from '@/components/ui/toaster';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';

export const useFeedback = () => {
  const [feedback, setFeedback] = useAtom(feedbackAtom);

  const { mutate, isPending, isSuccess } = useMutation<FeedbackResponseModel, Error, FeedbackRequest>({
    mutationFn: feedbackApi,
    onSuccess: (_, request) => {
      setFeedback({ ...feedback, imageName: request.imageName });
    },
    onError: error => {
      toaster.create({
        title: 'Failed to submit feedback',
        description: error.message,
        type: 'error',
        duration: 5000,
        meta: { closable: true },
      });
    },
  });

  return { mutate, isPending, isSuccess };
};
