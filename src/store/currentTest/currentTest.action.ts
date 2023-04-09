import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTest } from '../../service/userTest/userTest.service';
import { ICorrectAnswersToTest } from '../../types/question.types';
import { IUser } from '../../types/user.types';
import {
  ICreateCurrentTest,
  ICurrentTestState, IGetTestAnswers,
  ISaveTestResult,
} from './currentTest.interface';

export const createCurrentTest = createAsyncThunk<ICurrentTestState, ICreateCurrentTest>('create current test', async ({
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

export const getTestAnswers = createAsyncThunk<ICorrectAnswersToTest, IGetTestAnswers>('get test answer', async ({
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

export const saveTestResult = createAsyncThunk<IUser, ISaveTestResult>('save test result', async ({
  idUser, idTest, points,
}, thunkApi) => {
  try {
    const { data } = await userTest.saveResultsTest(idUser, idTest, points);
    return data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});
