import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { resultSelector } from './detectResult';

interface FeedbackStore {
  imageName?: string;
}
export const feedbackAtom = atom<FeedbackStore>({});

const resultImage = selectAtom(resultSelector, state => state?.imageName);
const feedbackImage = selectAtom(feedbackAtom, state => state.imageName);

export const isDisableFeedbackSelector = atom(get => get(resultImage) === get(feedbackImage));
