import { Maybe } from '@/types';
import { atom } from 'jotai';

export const selectedImage = atom<Maybe<File>>(null);
