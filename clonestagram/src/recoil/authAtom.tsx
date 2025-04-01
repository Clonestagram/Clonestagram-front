import { atom } from 'recoil';

export interface User {
    id: string;
    email: string;
    name: string;
  }

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});
