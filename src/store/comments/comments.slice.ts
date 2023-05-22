import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { MyToast } from '../../components/ui/MyToast/MyToast';
import { IComment, IRank } from '../../types/topic.types';
import {
  addComment, getCommentsById, rankComment, getAllRanks, deleteComment,
} from './comments.action';
import { ICommentsState } from './comments.interface';

const initialState: ICommentsState = {
  currentTopicComments: {
    id: '',
    comments: [],
  },
  prevStateComments: null,
  ranks: [],
  sortedRanks: [],
  currentSortType: 'dateDown',
  currentFormId: 'init',
  isLoading: false,
  isRankLoading: false,
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    changeFormStatus: (state, action: PayloadAction<string>) => {
      state.currentFormId = action.payload;
    },
    sortByLikes: (state) => {
      state.currentSortType = 'likes';
      let sortedRanks: IRank[] = [];
      sortedRanks = current(state.ranks.sort((a, b) => b.likes.length - a.likes.length));
      state.ranks = sortedRanks;
      const sortedArray: IComment[] = [];

      for (let i = 0; i < sortedRanks.length; i++) {
        const comment = state.currentTopicComments.comments.find((comment) => comment.id === sortedRanks[i].id);
        if (comment) {
          sortedArray.push(comment);
        }
      }
      state.prevStateComments = state.currentTopicComments.comments;
      state.currentTopicComments.comments = sortedArray;
    },
    sortByDate: (state) => {
      const currSortType = state.currentSortType;
      if (currSortType === 'dateDown') {
        state.currentSortType = 'dateUp';
      } else {
        state.currentSortType = 'dateDown';
      }

      let sortedComments: IComment[] = [];
      sortedComments = current(state.currentTopicComments.comments.sort((a, b) => {
        const aDate = new Date(a.pubDate);
        const bDate = new Date(b.pubDate);
        if (currSortType === 'dateDown') {
          if (bDate < aDate) return 1;
          return -1;
        }
        if (bDate > aDate) return 1;
        return -1;
      }));
      state.prevStateComments = state.currentTopicComments.comments;
      state.currentTopicComments.comments = sortedComments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentTopicComments = payload.commentsState;
        state.prevStateComments = null;
        state.ranks = payload.ranks;
        state.currentFormId = '';
      })
      .addCase(getCommentsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.prevStateComments = null;
        state.currentTopicComments = payload;
      })
      .addCase(rankComment.pending, (state) => {
        state.isRankLoading = true;
      })
      .addCase(rankComment.fulfilled, (state, { payload }) => {
        state.isRankLoading = false;
        const index = state.ranks.findIndex((rank) => rank.id === payload.id);
        state.ranks[index] = payload;
      })
      .addCase(getAllRanks.pending, (state) => {
        state.isRankLoading = true;
      })
      .addCase(getAllRanks.fulfilled, (state, { payload }) => {
        state.isRankLoading = false;
        state.ranks = payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentTopicComments = payload.commentsState;
        state.prevStateComments = null;
        state.ranks = payload.ranks;
        MyToast('Комментарий упешно удалён', true);
      })
      .addCase(deleteComment.rejected, (state) => {
        state.isLoading = false;
        MyToast('Не удалось удалить комментарий', false);
      });
  },
});

export const { reducer } = commentsSlice;
