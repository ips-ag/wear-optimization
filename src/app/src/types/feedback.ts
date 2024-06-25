import { ErrorModel, WearCode } from './detect';

export interface RequestModel {
  imageName: string;
  detectedWearAccepted: boolean;
  userWearCode?: WearCode;
  userComment?: string;
}

export interface FeedbackResponseModel {
  error?: ErrorModel;
}
