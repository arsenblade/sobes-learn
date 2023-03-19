import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addComment, getCommentsById } from './comments.action';
import { ICommentsState } from './comments.interface';

const initialState: ICommentsState = {
  currentTopicComments: {
    id: '',
    comments: [],
  },
  currentFormId: '',
  isLoading: false,
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    changeFormStatus: (state, action: PayloadAction<string>) => {
      state.currentFormId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentTopicComments = payload;
        state.currentFormId = '';
      })
      .addCase(getCommentsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentTopicComments = payload;
      });
  },
});

export const { reducer } = commentsSlice;
