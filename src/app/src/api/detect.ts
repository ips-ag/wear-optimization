import { DetectResponseModel } from '@/types';
import axios from 'axios';

const detectApi = async (image: Blob): Promise<DetectResponseModel> => {
  const formData = new FormData();
  formData.append('file', image);

  const response = await axios.post<DetectResponseModel>('/api/detect', formData, {
    headers: {
      'Content-Type': image.type,
    },
  });

  return response.data;
};

export default detectApi;
