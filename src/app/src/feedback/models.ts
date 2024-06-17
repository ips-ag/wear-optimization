import { ErrorModel, WearCode } from '../detect/models';

export interface RequestModel {
  imageName: string;
  resultAccepted: boolean;
  resultWearCode: WearCode;
  userWearCode?: WearCode;
  userComment?: string;
}

export interface ResponseModel {
  error?: ErrorModel;
}
