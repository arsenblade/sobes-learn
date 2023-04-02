import cn from 'classnames';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import styles from './QuestionItem.module.scss';

interface QuestionItemProps {
  questionNumber: number;
  cb: (i:number)=>void;
}

const QuestionItem = ({ questionNumber, cb }: QuestionItemProps) => {
  const {
    currentQuestion, userAnswers, numberQuestion,
  } = useTypedSelector((state) => state.currentTest);

  // const lengthUserAnswer = userAnswers && userAnswers[questionNumber].idAnswers.length;

  return (
    <div
      // className={cn(styles.questionItem, { [styles.questionItemComplete]: lengthUserAnswer && lengthUserAnswer > 0 })}
      className={cn(styles.questionItem)}
      onClick={() => { cb(questionNumber); }}
    >
      <span className={styles.questionNumber}>
        {questionNumber + 1}
      </span>
    </div>
  );
};

export default QuestionItem;
