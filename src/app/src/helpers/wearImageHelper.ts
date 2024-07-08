import { Maybe } from '@/types';

const wearImages = Object.values(import.meta.glob('@assets/images/wear/*.png', { eager: true, as: 'url' }));

export const getWearImagePath = (type: 'photo' | 'drawing', wearCodeName: Maybe<string>) => {
  console.log('wears', wearImages);
  if (!wearCodeName) return undefined;

  return wearImages.find(url => url.includes(`${wearCodeName}_${type}.png`));
};
