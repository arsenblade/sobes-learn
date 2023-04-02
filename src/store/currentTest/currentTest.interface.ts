import { IQuestion } from '../../types/question.types';

export interface IInitialStateTest {
  idTest: string | null;
  topicTitle: string | null,
  allQuestions: IQuestion[] | null;
  currentQuestion: IQuestion | null;
  userAnswers: IUserAnswer[] | null;
  numberQuestion: number;
  nextTopicId: string | null;
  isLoading: boolean;
}

export interface IUserAnswer {
  idQuestion: string;
  idAnswers: string[];
}

export interface ICurrentTestState {
  idTest: string
  topicTitle: string,
  allQuestions: IQuestion[],
  nextTopicId: string;
}
