import cn from 'classnames';
import { FC } from 'react';
import styles from './QuestionItem.module.scss';

interface QuestionItemProps {
  questionNumber: number;
  onClick: ((questionNumber: number) => void) | null;
  active?: boolean;
  choose?: boolean;
}

const QuestionItem:FC<QuestionItemProps> = ({
  questionNumber, onClick, active, choose,
}: QuestionItemProps) => {
  return (
    <div
      className={cn(styles.questionItem, { [styles.active]: active, [styles.choose]: choose && !active })}
      onClick={() => onClick && onClick(questionNumber)}
    >
      <span className={styles.questionNumber}>
        {questionNumber + 1}
      </span>
    </div>
  );
};

export default QuestionItem;
