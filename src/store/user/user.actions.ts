import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../service/user/user.service';
import { IUser } from '../../types/user.types';
import { IBanUser, IEditUserState } from './user.interface';

export const deleteUser = createAsyncThunk<IUser[], {id: string}>('deleteUser', async ({
  id,
}, thunkApi) => {
  try {
    await userService.deleteUser(id);
    const response = await userService.getAll();
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const banUser = createAsyncThunk<IUser[], IBanUser>('banUser', async ({
  id, banStatus,
}, thunkApi) => {
  try {
    await userService.changeBanStatus(id, banStatus);
    const response = await userService.getAll();
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const editUser = createAsyncThunk<IUser[], IEditUserState>('editUser', async (user, thunkApi) => {
  try {
    await userService.updateUser(user);
    const response = await userService.getAll();
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const getAllUsers = createAsyncThunk<IUser[]>('getAllUsers', async (_, thunkApi) => {
  try {
    const response = await userService.getAll();
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});
