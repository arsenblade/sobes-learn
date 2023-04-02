export interface IAnswersToQuestion {
  idAnswer: string;
  idQuestion: string;
  textAnswer: string;
}

export interface IQuestion {
  idQuestion: string;
  textQuestion: string;
  typeAnswers: 'radio' | 'checkbox' | 'text';
  answerOptions: IAnswersToQuestion[];
}

export interface ITest {
  idTest: string;
  currentQuestion: IQuestion;
  questions: IQuestion[];
}

export interface ICorrectAnswersToQuestion {
  idQuestion: string;
  idCorrectAnswers: string[];
  typeAnswer?: string;
}

export interface ICorrectAnswersToTest {
  id: string;
  answersToQuestions: ICorrectAnswersToQuestion[];
}
