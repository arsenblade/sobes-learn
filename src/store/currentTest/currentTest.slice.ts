import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyToast } from '../../components/ui/MyToast/MyToast';
import { IQuestion } from '../../types/question.types';
import { getStoreLocal, getStoreLocalArray } from '../../utils/getStoreLocal';
import { createCurrentTest } from './currentTest.action';
import { IUserAnswer, IInitialStateTest } from './currentTest.interface';

const initialState: IInitialStateTest = {
  idTest: localStorage.getItem('idTest'),
  topicTitle: localStorage.getItem('currentTopicTitle'),
  allQuestions: getStoreLocalArray<IQuestion[]>('allQuestions'),
  currentQuestion: getStoreLocal<IQuestion>('currentQuestion'),
  userAnswers: getStoreLocalArray<IUserAnswer[]>('userAnswers'),
  numberQuestion: 0,
  nextTopicId: localStorage.getItem('nextTopicId'),
  isLoading: false,
};

export const currentTestSlice = createSlice({
  name: 'currentTest',
  initialState,
  reducers: {
    changeCurrentQuestion: (state, action: PayloadAction<{index: number}>) => {
      state.numberQuestion = action.payload.index;
      state.currentQuestion = state.allQuestions && state.allQuestions[action.payload.index];
      localStorage.setItem('currentQuestion', JSON.stringify(state.currentQuestion));
    },
    addAnswer: (state, action: PayloadAction<{ idQuestion: string, idAnswersUser: string[] }>) => {
      const indexAnswer = state.allAnswersUser?.findIndex((answer) => answer.idQuestion === action.payload.idQuestion);
      if (state.allAnswersUser && indexAnswer !== undefined && indexAnswer !== -1) {
        state.allAnswersUser[indexAnswer] = {
          IdAnswersUser: action.payload.idAnswersUser,
          idQuestion: action.payload.idQuestion,
        };
        localStorage.setItem('userAnswers', JSON.stringify(state.userAnswers));
      } else if (state.userAnswers && (indexAnswer === undefined || indexAnswer === -1)) {
        state.userAnswers.push({
          idAnswers: action.payload.idAnswersUser,
          idQuestion: action.payload.idQuestion,
        });
        localStorage.setItem('userAnswers', JSON.stringify(state.userAnswers));
      }
    },
    nextQuestion: (state) => {
      state.numberQuestion += 1;
      state.currentQuestion = state.allQuestions && state.allQuestions[state.numberQuestion];
      localStorage.setItem('currentQuestion', JSON.stringify(state.currentQuestion));
    },
    prevQuestion: (state) => {
      state.numberQuestion -= 1;
      state.currentQuestion = state.allQuestions && state.allQuestions[state.numberQuestion];
      localStorage.setItem('currentQuestion', JSON.stringify(state.currentQuestion));
    },
    cleanCurrentQuestion: (state) => {
      state.allQuestions = null;
      state.currentQuestion = null;
      state.numberQuestion = 0;
      localStorage.removeItem('allQuestions');
      localStorage.removeItem('currentQuestion');
      localStorage.removeItem('currentTopicTitle');
      localStorage.removeItem('idTest');
      localStorage.removeItem('userAnswers');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCurrentTest.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(createCurrentTest.fulfilled, (state, { payload }) => {
        state.idTest = payload.idTest;
        state.topicTitle = payload.topicTitle;
        state.allQuestions = payload.allQuestions;
        state.currentQuestion = payload.allQuestions[0];
        state.nextTopicId = payload.nextTopicId;
        state.userAnswers = [];
        state.isLoading = false;
        localStorage.setItem('allQuestions', JSON.stringify(payload.allQuestions));
        localStorage.setItem('currentQuestion', JSON.stringify(payload.allQuestions[0]));
        localStorage.setItem('topicTitle', payload.topicTitle);
        localStorage.setItem('idTest', payload.idTest);
        localStorage.setItem('nextTopicId', payload.nextTopicId);
      })
      .addCase(createCurrentTest.rejected, (state) => {
        state.isLoading = false;
        MyToast('Произошла ошибка при загрузке тестов', false);
      });
  },
});

export const { reducer } = currentTestSlice;
