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
import useMediaQuery from '../../../../hooks/useMediaQuery';

const TopicTest = () => {
  const {idTest, topicTitle, allQuestions, currentQuestion, userAnswers, nextTopicId} = useTypedSelector((state) => state.currentTest);
  const {addAnswer, nextQuestion, prevQuestion, cleanCurrentQuestion, getTestAnswers, saveTestResult, changeCurrentQuestion} = useActions();

  const [idCheckedBtns, setIdCheckedBtns] = useState<string[]>([]);
  const [typeQuestionAnimation, setTypeQuestionAnimation] = useState<'back' | 'next' | 'current'>('current');
  const [isQuestionAnimation, setIsQuestionAnimation] = useState<boolean>(true);
  const [isViewModal, setIsViewModal] = useState<boolean>(false);
  const [testPoints, setTestPoints] = useState<number>(0);
  const [textAnswer, setTextAnswer] = useState<string>('');

  const isMobile = useMediaQuery('(max-width: 800px)');

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

  const nextMapQuestion = (questionNumber: number) => {
    if (currentQuestion && currentIndex !== undefined && allQuestions) {
      if (currentIndex < allQuestions.length) {
        addAnswer({
          idQuestion: currentQuestion.idQuestion,
          idAnswersUser: idCheckedBtns,
        });
        setTypeQuestionAnimation('next');
        setIsQuestionAnimation(false);

        setTimeout(() => {
          changeCurrentQuestion({ numberQuestion: questionNumber });
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
      const allUserAnswers = userAnswers?.map((userAnswer) => ({ ...userAnswer }));

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
      {(allQuestions && currentQuestion && currentIndex !== undefined && currentIndex !== -1)
      && (
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Вопросы по теме <span>{`"${topicTitle}"`}</span>
          </h1>
        </div>
        <QuestionMap allQuestions={allQuestions} onClick={nextMapQuestion} currentQuestion={currentQuestion} userAnswers={userAnswers || []} />
        <div className={styles.contentTest} style={{ overflow: 'hidden' }}>
          <CSSTransition
            in={isQuestionAnimation}
            classNames={getClassAnimationTest(typeQuestionAnimation)}
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div style={{minHeight: '400px'}}>
              <h2 className={styles.questions}>{currentQuestion?.textQuestion}</h2>
              <div className={styles.answersContainer}>
                {currentQuestion.typeAnswers === 'radio'
                  && currentQuestion.answerOptions.map((answer) => (
                    <RadioButton
                      key={answer.idAnswer}
                      className={styles.answer}
                      type="radioBtn"
                      checked={idCheckedBtns.some((idRadio) => idRadio === answer.idAnswer)}
                      onChange={(checked) => checked && setIdCheckedBtns([answer.idAnswer])}
                    >
                      {answer.textAnswer}
                    </RadioButton>
                  ))}
                {currentQuestion.typeAnswers === 'checkbox'
                  && currentQuestion.answerOptions.map((answer) => (
                    <Checkbox
                      key={answer.idAnswer}
                      className={styles.answer}
                      checked={idCheckedBtns.some((idCheckbox) => idCheckbox === answer.idAnswer)}
                      onChange={(checked) => handleClickCheckbox(checked, answer.idAnswer)}
                    >
                      {answer.textAnswer}
                    </Checkbox>
                  ))}
                {currentQuestion.typeAnswers === 'text'
                  && (
                    <FormInput
                      value={textAnswer}
                      onChange={(e) => {
                        setTextAnswer(e.target.value);
                        setIdCheckedBtns([e.target.value]);
                      }}
                    />
                  )}
              </div>
            </div>
          </CSSTransition>
          <div className={styles.containerBtn}>
            {!isMobile ? (
              <Button className={cn(styles.btn, styles.btnBack)} onClick={() => prevTestQuestion()} color="White" disabled={currentIndex <= 0}>Назад</Button>
            ) : null}

            {isMobile ? (
              <svg className={cn(styles.iconBack, {[styles.iconDisabled]: currentIndex === 0})} onClick={() => currentIndex > 0 && prevTestQuestion()} width="101" height="47" viewBox="0 0 101 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M96.9896 19.9009L12.107 19.9009L22.2065 7.85565C23.5236 6.28482 23.5236 3.73897 22.2065 2.16814C20.8895 0.597305 18.7549 0.597305 17.4378 2.16814L1.55331 21.1184C0.236221 22.6147 0.185158 25.0996 1.4398 26.6704C1.47613 26.7165 1.5147 26.7612 1.55331 26.8058L17.4412 45.7507C18.6958 47.3215 20.7793 47.3824 22.0964 45.886C22.135 45.8414 22.1736 45.7967 22.2099 45.7507C23.527 44.2543 23.5781 41.7694 22.3235 40.1986C22.286 40.1525 22.2485 40.1078 22.2099 40.0631L12.1105 28.0111L96.9896 28.0111C98.871 28.0111 100.396 26.1924 100.396 23.9486C100.396 21.7047 98.871 19.8861 96.9896 19.8861V19.9009Z" />
              </svg>
            ) : null}

            <span className={styles.numberTest}>
              {currentIndex + 1} / {allQuestions?.length}
            </span>

            {((currentIndex < allQuestions.length - 1) && !isMobile) ? (
              <Button className={cn(styles.btn, styles.btnNext)} onClick={() => nextTestQuestion()} color="Pink" disabled={allQuestions.length - 1 <= currentIndex}>Следующий вопрос</Button>
            ) : null}

            {(isMobile) ? (
              <svg className={cn(styles.iconNext, {[styles.iconDisabled]: currentIndex === allQuestions.length - 1})} onClick={() => currentIndex < allQuestions.length - 1 && nextTestQuestion()} width="101" height="47" viewBox="0 0 101 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.01038 27.0991H88.893L78.7935 39.1443C77.4764 40.7152 77.4764 43.261 78.7935 44.8319C80.1105 46.4027 82.2451 46.4027 83.5622 44.8319L99.4467 25.8816C100.764 24.3853 100.815 21.9004 99.5602 20.3296C99.5239 20.2835 99.4853 20.2388 99.4467 20.1942L83.5588 1.24934C82.3042 -0.321495 80.2207 -0.3824 78.9036 1.11395C78.865 1.15864 78.8264 1.2033 78.7901 1.24934C77.473 2.74569 77.4219 5.2306 78.6765 6.80143C78.714 6.84747 78.7515 6.89217 78.7901 6.93685L88.8895 18.9889H4.01038C2.12899 18.9889 0.604126 20.8076 0.604126 23.0514C0.604126 25.2953 2.12899 27.1139 4.01038 27.1139V27.0991Z" />
              </svg>
            ) : null}

            {(currentIndex === allQuestions.length - 1 || isMobile) ? (
              <Button className={cn(styles.btn, styles.btnResult)} onClick={() => saveResultTest()} color="Pink" disabled={idCheckedBtns.length === 0}>Завершить тест</Button>
            ) : null}

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
