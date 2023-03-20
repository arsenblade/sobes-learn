import { createAsyncThunk } from '@reduxjs/toolkit';
import { commentsService } from '../../service/comments/comments.service';
import { IComment } from '../../types/topic.types';
import { dateToString } from '../../utils/dateToString';
import { IAddComment, ICommentsStateElement } from './comments.interface';

const { v4: uuidv4 } = require('uuid');

export const addComment = createAsyncThunk<ICommentsStateElement, IAddComment>(
  'add comment',
  async ({
    userId, username, text, topicId, parentId,
  }, thunkApi) => {
    try {
      const date = new Date();
      const newComment: IComment = {
        id: uuidv4(),
        userId,
        pubDate: dateToString(date),
        username,
        commentText: text,
        replies: [],
        parentId: parentId ?? '',
      };
      const response = await commentsService.addComment(newComment, topicId);
      return response;
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
