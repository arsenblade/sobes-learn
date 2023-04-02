import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Button from '../../../ui/Button/Button';
import Checkbox from '../../../ui/Checkboxes/Checkbox';
import RadioButton from '../../../ui/RadioButtons/RadioButton';
import styles from './TopicTest.module.scss';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { useAuth } from '../../../../hooks/useAuth';
import { getClassAnimationTest } from '../../../../utils/getClassAnimation';
import Modal from '../../../ui/Modal/modal';
import { getPointUser } from '../../../../utils/getPointUser';
import FormInput from '../../../ui/FormInput/FormInput';
import QuestionMap from './QuestionMap/QuestionMap';

const TopicTest = () => {
  const {
    idTest, topicTitle, allQuestions, currentQuestion, userAnswers, nextTopicId,
  } = useTypedSelector((state) => state.currentTest);
  const {
    addAnswer, nextQuestion, prevQuestion, cleanCurrentQuestion, getTestAnswers, saveTestResult, changeCurrentQuestion,
  } = useActions();

  const [idCheckedBtns, setIdCheckedBtns] = useState<string[]>([]);
  const [typeQuestionAnimation, setTypeQuestionAnimation] = useState<'back' | 'next' | 'current'>('current');
  const [isQuestionAnimation, setIsQuestionAnimation] = useState<boolean>(true);
  const [isViewModal, setIsViewModal] = useState<boolean>(false);
  const [testPoints, setTestPoints] = useState(0);
  const [textAnswer, setTextAnswer] = useState('');

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userAnswers && userAnswers.length > 0 && currentQuestion) {
      const answers = userAnswers.find((answer) => answer.idQuestion === currentQuestion.idQuestion);
      if (answers !== undefined) {
        setIdCheckedBtns(answers.idAnswers);
      }
    }
  }, [currentQuestion]);

  const handleClickCheckbox = (checked: boolean, answerId: string) => {
    if (checked === true) {
      setIdCheckedBtns([...idCheckedBtns, answerId]);
    }
    if (checked === false) {
      const filteredCheckbox = idCheckedBtns.filter((idCheckbox) => idCheckbox !== answerId);
      setIdCheckedBtns([...filteredCheckbox]);
    }
  };

  const currentIndex = allQuestions?.findIndex((question) => question.idQuestion === currentQuestion?.idQuestion);

  const nextMapQuestion = (i: number) => {
    if (currentQuestion && currentIndex !== undefined && allQuestions) {
      if (currentIndex < allQuestions.length) {
        addAnswer({
          idQuestion: currentQuestion.idQuestion,
          idAnswersUser: idCheckedBtns,
        });
        setTypeQuestionAnimation('next');
        setIsQuestionAnimation(false);

        setTimeout(() => {
          changeCurrentQuestion({ index: i });
          setIdCheckedBtns([]);
          setTypeQuestionAnimation('back');
          setIsQuestionAnimation(true);
        }, 200);
      }
    }
  };

  const nextTestQuestion = () => {
    if (currentQuestion && currentIndex !== undefined && allQuestions) {
      if (currentIndex < allQuestions.length - 1) {
        addAnswer({
          idQuestion: currentQuestion.idQuestion,
          idAnswersUser: idCheckedBtns,
        });
        setTypeQuestionAnimation('next');
        setIsQuestionAnimation(false);

        setTimeout(() => {
          nextQuestion();
          setIdCheckedBtns([]);
          setTypeQuestionAnimation('back');
          setIsQuestionAnimation(true);
        }, 200);
      }
    }
  };

  const prevTestQuestion = () => {
    if (currentQuestion && currentIndex !== undefined && allQuestions) {
      if (currentIndex > 0) {
        addAnswer({
          idQuestion: currentQuestion.idQuestion,
          idAnswersUser: idCheckedBtns,
        });
        setTypeQuestionAnimation('back');
        setIsQuestionAnimation(false);
        setTimeout(() => {
          prevQuestion();
          setIdCheckedBtns([]);
          setTypeQuestionAnimation('next');
          setIsQuestionAnimation(true);
        }, 200);
      }
    }
  };

  const saveResultTest = async () => {
    if (currentQuestion && currentIndex !== undefined && allQuestions && user && idTest && nextTopicId) {
      const indexAnswer = userAnswers?.findIndex((answer) => answer.idQuestion === currentQuestion.idQuestion);
      const allUserAnswers = userAnswers?.map((a) => ({ ...a }));

      if (allUserAnswers && indexAnswer !== undefined && indexAnswer !== -1) {
        allUserAnswers[indexAnswer] = {
          idAnswers: idCheckedBtns,
          idQuestion: currentQuestion.idQuestion,
        };
      } else if (allUserAnswers && (indexAnswer === undefined || indexAnswer === -1)) {
        allUserAnswers.push({
          idAnswers: idCheckedBtns,
          idQuestion: currentQuestion.idQuestion,
        });
      }

      if (userAnswers) {
        const response = await getTestAnswers({ id: idTest });
        // @ts-ignore
        const points = getPointUser(allUserAnswers, response.payload.answersToQuestions);
        setTestPoints(Number(points));
        saveTestResult({ idUser: user.id, idTest, points });
        setIsViewModal(true);

        if (nextTopicId === 'lastTopic') {
          setTimeout(() => {
            cleanCurrentQuestion();
            navigate('/topics/react');
          }, 3500);
        } else {
          setTimeout(() => {
            cleanCurrentQuestion();
            navigate(`/topics/react/${nextTopicId}`);
          }, 3500);
        }
      }
    }
  };

  return (
    <div className={styles.topicTest}>
      {allQuestions && currentQuestion && currentIndex !== undefined && currentIndex !== -1
      && (
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Вопросы по теме
            {' '}
            {topicTitle}
          </h1>
          <span className={styles.numberTest}>
            {currentIndex + 1}
            {' '}
            /
            {' '}
            {allQuestions?.length}
          </span>
        </div>
        <QuestionMap allQuestions={allQuestions} cb={nextMapQuestion} />
        <div className={styles.contentTest} style={{ overflow: 'hidden' }}>
          <CSSTransition
            in={isQuestionAnimation}
            classNames={getClassAnimationTest(typeQuestionAnimation)}
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <h2 className={styles.questions}>{currentQuestion?.textQuestion}</h2>
              <div className={styles.answersContainer}>
                {currentQuestion.typeAnswers === 'radio' && currentQuestion.answerOptions.map((answer) => <RadioButton onChange={(checked) => checked === true && setIdCheckedBtns([answer.idAnswer])} key={answer.idAnswer} className={styles.answer} type="radioBtn" checked={idCheckedBtns.some((idRadio) => idRadio === answer.idAnswer)}>{answer.textAnswer}</RadioButton>)}
                {currentQuestion.typeAnswers === 'checkbox' && currentQuestion.answerOptions.map((answer) => <Checkbox onChange={(checked) => handleClickCheckbox(checked, answer.idAnswer)} key={answer.idAnswer} className={styles.answer} checked={idCheckedBtns.some((idCheckbox) => idCheckbox === answer.idAnswer)}>{answer.textAnswer}</Checkbox>)}
                {currentQuestion.typeAnswers === 'text' && <FormInput onChange={(e) => { setTextAnswer(e.target.value); setIdCheckedBtns([e.target.value]); }} value={textAnswer} />}
              </div>
            </div>
          </CSSTransition>
          <div className={styles.containerBtn}>
            <Button className={cn(styles.btn, styles.btnBack)} onClick={() => prevTestQuestion()} color="White" disabled={currentIndex <= 0}>Назад</Button>
            {currentIndex < allQuestions.length - 1 && <Button className={cn(styles.btn, styles.btnNext)} onClick={() => nextTestQuestion()} color="Pink" disabled={allQuestions.length - 1 <= currentIndex}>Следующий вопрос</Button>}
            {currentIndex === allQuestions.length - 1 && <Button className={cn(styles.btn, styles.btnNext)} onClick={() => saveResultTest()} color="Pink" disabled={idCheckedBtns.length === 0}>Завершить тест</Button>}
          </div>
        </div>
      </>
      )}
      <Modal
        active={isViewModal}
        setActive={setIsViewModal}
        count={testPoints}
      />
    </div>
  );
};

export default TopicTest;
