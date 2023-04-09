import { IUserAnswer } from '../store/currentTest/currentTest.interface';
import { ICorrectAnswersToQuestion } from '../types/question.types';

export const getPointUser = (userAnswers: IUserAnswer[], correctAnswers: ICorrectAnswersToQuestion[]) => {
  let points = 0;
  const _ = require('lodash');

  const correctAnswersMap = new Map<string, ICorrectAnswersToQuestion>();

  correctAnswers.forEach((correctAnswer) => { correctAnswersMap.set(correctAnswer.idQuestion, correctAnswer); });

  userAnswers.forEach((userAnswer) => {
    const correctAnswer = correctAnswersMap.get(userAnswer.idQuestion);
    if (correctAnswer) {
      const typeAnswer = correctAnswer.typeAnswer;
      const sortUserAnswer = [...userAnswer.idAnswers].sort();
      const sortCorrectAnswer = [...correctAnswer.idCorrectAnswers].sort();

      if (typeAnswer === 'text') {
        correctAnswer.idCorrectAnswers.forEach((corAnswer) => {
          if (userAnswer.idAnswers.includes(corAnswer)) {
            points += 1;
          }
        });
      }

      if (_.isEqual(sortCorrectAnswer, sortUserAnswer)) {
        points += 1;
      }
    }
  });

  return String(points);
};
