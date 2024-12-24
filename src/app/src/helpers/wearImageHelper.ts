import { Maybe } from '@/types';

export const WearType = {
  PHOTO: 'photo',
  DRAWING: 'drawing',
} as const;

export type WearType = (typeof WearType)[keyof typeof WearType];

const wearImages = import.meta.glob('@/assets/images/wear/*.png', {
  eager: true,
  as: 'url',
}) as Record<string, string>;

export const getWearImagePath = (type: WearType, wearCodeName: Maybe<string>): string | undefined => {
  if (!wearCodeName) {
    return undefined;
  }

  const fileName = `${wearCodeName}_${type}.png`;
  const imagePath = Object.entries(wearImages).find(([path]) => path.endsWith(fileName))?.[1];

  if (!imagePath) {
    console.warn(`Wear image not found for type: ${type} and code: ${wearCodeName}`);
  }

  return imagePath;
};
