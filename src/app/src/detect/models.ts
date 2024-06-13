export interface ResponseModel {
  error?: ErrorModel;
  result?: ResultModel;
}

export interface ErrorModel {
  code: string;
  message: string;
}

export interface ResultModel {
  wearCode: WearCode;
  wearConfidence: number;
  wearCause: string;
  suggestedActions: string[];
  description?: string;
}

export enum WearCode {
  none,
  buildupOnCuttingEdge,
  flankFaceWear,
  craterWear,
  fractures,
  plasticDeformation,
  notchWear,
  thermalCracking,
  galling,
  mouldEdgeWear,
}
