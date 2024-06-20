import { ErrorModel, WearCode } from '../detect/models';

export interface RequestModel {
  imageName: string;
  detectedWearAccepted: boolean;
  userWearCode?: WearCode;
  userComment?: string;
}

export interface ResponseModel {
  error?: ErrorModel;
}
