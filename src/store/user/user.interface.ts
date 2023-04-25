import { IUser } from '../../types/user.types';

export interface IEditUserState extends Omit<IUser, 'regDate' | 'pointTests' | 'avatar'> {}

export interface IInitalStateUser {
  isLoading: boolean;
  error: string;
  users: IUser[];
  modalId: string;
}

export interface IBanUser {
  id: string, banStatus: boolean
}
