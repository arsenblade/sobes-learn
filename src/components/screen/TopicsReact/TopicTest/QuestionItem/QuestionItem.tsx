import cn from 'classnames';
import { FC } from 'react';
import styles from './QuestionItem.module.scss';

interface QuestionItemProps {
  questionNumber: number;
  onClick: (questionNumber: number) => void;
}

const QuestionItem:FC<QuestionItemProps> = ({ questionNumber, onClick }: QuestionItemProps) => (
  <div
    className={cn(styles.questionItem)}
    onClick={() => onClick(questionNumber)}
  >
    <span className={styles.questionNumber}>
      {questionNumber + 1}
    </span>
  </div>
);

export default QuestionItem;
