import { atom } from 'recoil';
import { LoginUser } from '../data/loginUser';

export const loginUserState = atom<LoginUser | null>({
  key: 'loginUserState',
  default: null,
});
