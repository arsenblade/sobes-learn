import { Dispatch, SetStateAction } from 'react';

export interface IUserMenu {
  options: IOption[];
  value: IOption | undefined;
  isAdmin: boolean;
  onChange: Dispatch<SetStateAction<IOption | undefined>>;
}

export interface IOption {
  value: string,
  label: string
}
