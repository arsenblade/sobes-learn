import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyToast } from '../../components/ui/MyToast/MyToast';
import {
  banUser, deleteUser, editUser, getAllUsers,
} from './user.actions';
import { IInitalStateUser } from './user.interface';

const initialState: IInitalStateUser = {
  isLoading: false,
  error: '',
  users: [],
  modalId: 'init',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeModalStatus: (state, action: PayloadAction<string>) => {
      state.modalId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
        state.modalId = '';
        MyToast('Пользователь успешно удалён!', true);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        MyToast('Произошла ошибка при удалении пользователя', false);
      })
      .addCase(banUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(banUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
        state.modalId = '';
        MyToast('Пользователь успешно забанен!', true);
      })
      .addCase(banUser.rejected, (state) => {
        state.isLoading = false;
        MyToast('Произошла ошибка при бане пользователя', false);
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
        MyToast('Пользователь успешно изменён!', true);
      })
      .addCase(editUser.rejected, (state) => {
        state.isLoading = false;
        MyToast('Произошла ошибка при редактировании пользователя', false);
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        MyToast('Не удалось загрузить всех пользователей', false);
      });
  },
});

export const { reducer } = userSlice;
