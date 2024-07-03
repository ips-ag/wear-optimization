import { Maybe, WearCode, wearCodeNameMap } from '@/types';

export const getWearCodeName = (wearCode: WearCode): Maybe<string> => {
  if (wearCode) {
    return wearCodeNameMap[wearCode];
  }

  return null;
};
