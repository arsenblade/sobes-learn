import { axiosPrivate } from '../../api/interceptors';
import { getUserUrl, getUsersUrl } from '../../constants/serverPath';
import { IUser } from '../../types/user.types';

export const userService = {
  async getAll() {
    const response = await axiosPrivate.get<IUser[]>(getUsersUrl());

    return response;
  },

  async getById(id: string) {
    const response = await axiosPrivate.get<IUser>(getUserUrl(id));

    return response;
  },

  async updateUser(id: string, email: string, password: string, name: string, isBanned?: boolean, isAdmin?: boolean) {
    console.log(isBanned);
    const response = await axiosPrivate.patch<IUser>(getUserUrl(id), {
      email, password, name, isAdmin, isBanned,
    });

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
