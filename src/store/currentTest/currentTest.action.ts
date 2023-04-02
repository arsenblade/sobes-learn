import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTest } from '../../service/userTest/userTest.service';
import { ICorrectAnswersToTest } from '../../types/question.types';
import { IUser } from '../../types/user.types';
import { ICurrentTestState } from './currentTest.interface';

export const createCurrentTest = createAsyncThunk<ICurrentTestState, {id: string, topicTitle: string, idTest: string, nextTopicId: string | 'lastTopic'} >('create current test', async ({
  id, topicTitle, idTest, nextTopicId,
}, thunkApi) => {
  try {
    const { data } = await userTest.getById(id);
    const currentTestData: ICurrentTestState = {
      idTest,
      allQuestions: data.questions,
      topicTitle,
      nextTopicId,
    };
    return currentTestData;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const getTestAnswers = createAsyncThunk<ICorrectAnswersToTest, {id: string}>('get test answer', async ({
  id,
}, thunkApi) => {
  try {
    const { data } = await userTest.getAnswersToTest(id);
    const answersToTest: ICorrectAnswersToTest = {
      id: data.id,
      answersToQuestions: data.answersToQuestions,
    };
    return answersToTest;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const saveTestResult = createAsyncThunk<IUser, {idUser: string, idTest: string, points: string}>('save test result', async ({
  idUser, idTest, points,
}, thunkApi) => {
  try {
    const { data } = await userTest.saveResultsTest(idUser, idTest, points);
    return data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});
