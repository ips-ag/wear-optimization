import { FeedbackRequest, FeedbackResponseModel } from '@/types';
import axios from 'axios';

const feedbackApi = async (request: FeedbackRequest): Promise<FeedbackResponseModel> => {
  const response = await axios.post<FeedbackResponseModel>('/api/feedback', request, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export default feedbackApi;
