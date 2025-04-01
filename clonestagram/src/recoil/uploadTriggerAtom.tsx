// recoil/uploadTriggerAtom.ts
import { atom } from 'recoil';

export const uploadTriggerState = atom<number>({
  key: 'uploadTriggerState',
  default: 0,
});
