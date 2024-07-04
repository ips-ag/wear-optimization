import { Maybe, WearCode, wearCodeNameMap } from '@/types';

export const getWearCodeName = (wearCode: Maybe<string>): Maybe<string> => {
  const code = WearCode[wearCode as keyof typeof WearCode];

  if (code) {
    return wearCodeNameMap[code];
  }

  return '';
};
