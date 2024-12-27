import { Maybe, WearCode, wearCodeNameMap } from '@/types';

export const getWearCodeName = (wearCode: Maybe<string | number>): Maybe<string> => {
  if (wearCode === null || wearCode === undefined) return '';

  // Convert number to WearCode enum
  if (typeof wearCode === 'number') {
    return wearCodeNameMap[wearCode as WearCode];
  }

  // If it's a string, try to parse it as number and convert to enum
  const numericCode = parseInt(wearCode, 10);
  if (!isNaN(numericCode)) {
    return wearCodeNameMap[numericCode as WearCode];
  }

  const code = WearCode[wearCode as keyof typeof WearCode];
  if (code !== undefined) {
    return wearCodeNameMap[code];
  }

  return '';
};
