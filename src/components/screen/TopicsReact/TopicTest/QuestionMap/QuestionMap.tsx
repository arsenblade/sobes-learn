import { FC, useState } from 'react';
import classNames from 'classnames';
import { IQuestion } from '../../../../../types/question.types';
import QuestionItem from '../QuestionItem/QuestionItem';
import styles from './QuestionMap.module.scss';
import { IUserAnswer } from '../../../../../store/currentTest/currentTest.interface';

interface QuestionMapProps {
  allQuestions: IQuestion[];
  currentQuestion: IQuestion;
  userAnswers: IUserAnswer[];
  onClick: (questionNumber: number) => void;
}

const QuestionMap:FC<QuestionMapProps> = ({allQuestions, onClick, currentQuestion, userAnswers}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={classNames(styles.questionMap, {[styles.activeQuestionMap]: isVisible})}>
      <p className={styles.questionMapText}>Выбор вопроса</p>
      <div className={styles.questions}>
        {allQuestions.map((question, index) => (
          <QuestionItem
            questionNumber={index}
            onClick={question.idQuestion !== currentQuestion.idQuestion ? onClick : null}
            active={question.idQuestion === currentQuestion.idQuestion}
            choose={userAnswers.some((userAnswer) => userAnswer.idAnswers.length > 0 && userAnswer.idQuestion === question.idQuestion)}
            key={question.idQuestion}
          />
        ))}
      </div>

      <div className={styles.mapButton} onClick={() => setIsVisible(((prevState) => !prevState))}>
        Вопросы
      </div>
    </div>
  );
};

export default QuestionMap;
