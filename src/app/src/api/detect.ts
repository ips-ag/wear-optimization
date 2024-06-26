import { DetectResponseModel } from '@/types';
import axios from 'axios';

const detectApi = async (image: File): Promise<DetectResponseModel> => {
  const response = await axios.post<DetectResponseModel>('/api/detect', image, {
    headers: {
      'Content-Type': image.type,
    },
  });

  return response.data;
};

export default detectApi;
