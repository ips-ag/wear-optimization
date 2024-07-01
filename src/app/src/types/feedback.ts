import { Maybe } from './common';
import { ErrorModel, WearCode } from './detect';

export interface FeedbackRequest {
  imageName: string;
  detectedWearAccepted: boolean;
  userWearCode?: Maybe<WearCode>;
  userComment?: Maybe<string>;
}

export interface FeedbackResponseModel {
  error?: ErrorModel;
}
