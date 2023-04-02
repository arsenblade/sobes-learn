import { IQuestion } from '../../../../../types/question.types';
import QuestionItem from '../QuestionItem/QuestionItem';
import styles from './QuestionMap.module.scss';

interface QuestionMapProps {
  allQuestions: IQuestion[];
  cb: (i: number) => void;
}

const QuestionMap = ({ allQuestions, cb }: QuestionMapProps) => (
  <div className={styles.questionMap}>
    <p className={styles.questionMapText}>Выбор вопроса</p>
    <div className={styles.questions}>
      {allQuestions.map((question, index) => <QuestionItem questionNumber={index} cb={cb} key={question.idQuestion} />)}
    </div>
  </div>
);

export default QuestionMap;
