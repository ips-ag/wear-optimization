import { Maybe } from '@/types';

const wearImages = Object.values(import.meta.glob('@assets/images/wear/*.png', { eager: true, query: '?url', import: 'default' })) as string[];

export const getWearImagePath = (type: 'photo' | 'drawing', wearCodeName: Maybe<string>) => {
  if (!wearCodeName) return undefined;

  return wearImages.find(url => url.includes(`${wearCodeName}_${type}.png`));
};
