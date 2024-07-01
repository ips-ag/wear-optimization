export interface DetectResponseModel {
  error?: ErrorModel;
  result?: ResultModel;
}

export interface ErrorModel {
  code: string;
  message: string;
}

export interface ResultModel {
  imageName: string;
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

export const wearCodeNameMap: Record<WearCode, string> = {
  [WearCode.none]: 'None',
  [WearCode.buildupOnCuttingEdge]: 'Buildup on cutting edge',
  [WearCode.flankFaceWear]: 'Flank face wear',
  [WearCode.craterWear]: 'Crater wear',
  [WearCode.fractures]: 'Fractures',
  [WearCode.plasticDeformation]: 'Plastic deformation',
  [WearCode.notchWear]: 'Notch wear',
  [WearCode.thermalCracking]: 'Thermal cracking',
  [WearCode.galling]: 'Galling',
  [WearCode.mouldEdgeWear]: 'Mould edge wear',
};
