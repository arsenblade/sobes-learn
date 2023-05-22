import { createAsyncThunk } from '@reduxjs/toolkit';
import { commentsService } from '../../service/comments/comments.service';
import { IComment, IRank } from '../../types/topic.types';
import { IAddComment, ICommentsRanks, ICommentsStateElement } from './comments.interface';

const { v4: uuidv4 } = require('uuid');

export const addComment = createAsyncThunk<ICommentsRanks, IAddComment>(
  'add comment',
  async ({
    userId, username, text, topicId, parentId,
  }, thunkApi) => {
    try {
      const date = new Date();
      const newComment: IComment = {
        id: uuidv4(),
        userId,
        pubDate: date.toISOString(),
        username,
        commentText: text,
        replies: [],
        parentId: parentId ?? '',
      };
      const responseData = await commentsService.addComment(newComment, topicId);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteComment = createAsyncThunk<ICommentsRanks, {commentId: string, topicId: string, parentId?: string}>(
  'delete comment',
  async ({ commentId, topicId, parentId }, thunkApi) => {
    try {
      const responseData = await commentsService.deleteComment(commentId, topicId, parentId);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getCommentsById = createAsyncThunk<ICommentsStateElement, {topicId: string}>(
  'get comments by id',
  async ({ topicId }, thunkApi) => {
    try {
      const response = await commentsService.getCommentsById(topicId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getAllComments = createAsyncThunk<ICommentsStateElement[]>(
  'get all comments',
  async (_, thunkApi) => {
    try {
      const response = await commentsService.getAllComments();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getAllRanks = createAsyncThunk<IRank[]>(
  'get all ranks',
  async (_, thunkApi) => {
    try {
      const response = await commentsService.getAllRanks();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const rankComment = createAsyncThunk<IRank, IRank>(
  'rank comment',
  async (rank, thunkApi) => {
    try {
      const response = await commentsService.rankComment(rank);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
