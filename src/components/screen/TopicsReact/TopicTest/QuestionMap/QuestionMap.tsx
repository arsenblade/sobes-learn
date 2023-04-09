import { FC } from 'react';
import { IQuestion } from '../../../../../types/question.types';
import QuestionItem from '../QuestionItem/QuestionItem';
import styles from './QuestionMap.module.scss';

interface QuestionMapProps {
  allQuestions: IQuestion[];
  onClick: (questionNumber: number) => void;
}

const QuestionMap:FC<QuestionMapProps> = ({ allQuestions, onClick }) => (
  <div className={styles.questionMap}>
    <p className={styles.questionMapText}>Выбор вопроса</p>
    <div className={styles.questions}>
      {allQuestions.map((question, index) => <QuestionItem questionNumber={index} onClick={onClick} key={question.idQuestion} />)}
    </div>
  </div>
);

export default QuestionMap;
