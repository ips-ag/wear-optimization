import { DetectResponseModel, Maybe } from '@/types';
import { atom } from 'jotai';

export const detectResultAtom = atom<Maybe<DetectResponseModel>>(null);

export const resultSelector = atom(get => get(detectResultAtom)?.result);
