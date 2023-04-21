import { axiosPrivate } from '../../api/interceptors';
import { getUserUrl, getUsersUrl } from '../../constants/serverPath';
import { IEditUserState } from '../../store/user/user.interface';
import { IUpdateUser, IUser } from '../../types/user.types';

export const userService = {
  async getAll() {
    const response = await axiosPrivate.get<IUser[]>(getUsersUrl());

    return response;
  },

  async getById(id: string) {
    const response = await axiosPrivate.get<IUser>(getUserUrl(id));

    return response;
  },

  async updateUser(updatedUser: IEditUserState) {
    const response = await axiosPrivate.patch<IUser>(getUserUrl(updatedUser.id), updatedUser);

    return response;
  },

  async changeBanStatus(id: string, isBanned: boolean) {
    const response = await axiosPrivate.patch<IUser>(getUserUrl(id), { isBanned });

    return response;
  },

  async deleteUser(id: string) {
    const response = await axiosPrivate.delete<IUser>(getUserUrl(id));

    return response;
  },
};
