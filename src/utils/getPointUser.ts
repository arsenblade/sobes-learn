import { IUserAnswer } from '../store/currentTest/currentTest.interface';
import { ICorrectAnswersToQuestion } from '../types/question.types';

export const getPointUser = (userAnswers: IUserAnswer[], correctAnswers: ICorrectAnswersToQuestion[]) => {
  let points = 0;
  const _ = require('lodash');

  userAnswers.forEach((userAnswer) => {
    const typeAnswer = correctAnswers.find((a) => a.idQuestion === userAnswer.idQuestion)?.typeAnswer;
    const correctAnswer = correctAnswers.find((a) => a.idQuestion === userAnswer.idQuestion)?.idCorrectAnswers;
    const sortUserAnswer = [...userAnswer.idAnswers].sort();

    if (typeAnswer === 'text') {
      correctAnswer?.forEach((cAnswer) => {
        if (userAnswer.idAnswers.includes(cAnswer)) {
          points += 1;
        }
      });
    }

    if (correctAnswer !== undefined && _.isEqual(correctAnswer.sort(), sortUserAnswer)) {
      points += 1;
    }
  });
  return String(points);
};
