import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../../ui/Button/Button';
import styles from './OurProgram.module.scss';
import InfoCircle from '../../../ui/InfoCircle/InfoCircle';
import { Accordion } from '../../../ui/Accordion/Accordion';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const ourProgramAnimation = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const OurProgram = () => {
  const [isVisibleAccordion, setIsVisibleAccordion] = useState<boolean>(false);
  const [isVisibleInfoCircle, setIsVisibleInfoCircle] = useState<boolean>(true);
  const isMounted = useRef(false);

  const isTabletWidth = useMediaQuery('(max-width: 950px)');

  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setIsVisibleAccordion(true);
      }, 500);
    } else {
      isMounted.current = true;
    }
  }, [isVisibleInfoCircle]);

  return (
    <motion.section
      className={styles.ourProgram}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      id="ourProgram"
      style={{ overflow: 'hidden' }}
    >
      <motion.div className={styles.contentContainer} variants={ourProgramAnimation}>
        <h2 className={styles.title}>Программа нашего курса</h2>
        <p className={styles.description}>
          Программа будет состоять из нескольких модулей, в каждом модуле будет разбираться один из аспектов подготовки к собеседованиям, таких как: теория, JavaScript задачи, алгоритмические задачи и личностная подготовка
        </p>
        <Button className={styles.btn} color="Pink" onClick={() => setIsVisibleInfoCircle(false)}>Подробнее</Button>
      </motion.div>
      <motion.div className={styles.moreAboutProgram} variants={ourProgramAnimation}>
        <CSSTransition
          in={isVisibleAccordion}
          classNames="accordion"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.accordionProgram}>
            <Accordion title="Разбор теоретических вопросы">
              <ul className={styles.list}>
                <li className={styles.item}>
                  Вопросы по <strong>HTML</strong>
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>CSS</strong>
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>JavaScript</strong>. Часть 1
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>JavaScript</strong>. Часть 2
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>JavaScript</strong>. Часть 3
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>TypeScript</strong>. Часть 1
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>TypeScript</strong>. Часть 2
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>React</strong>. Часть 1
                </li>
                <li className={styles.item}>
                  Вопросы по <strong>React</strong>. Часть 2
                </li>
              </ul>
            </Accordion>
            <Accordion title="Решение JavaScript задач">
              <ul className={styles.list}>
                <li className={styles.item}>Создать свой bind, apply, call</li>
                <li className={styles.item}>Создать свой promiseAll</li>
                <li className={styles.item}>Решение задач с выводом в консоль</li>
                <li className={styles.item}>Решение задач с запросами</li>
                <li className={styles.item}>Создать свой map</li>
                <li className={styles.item}>Создать свой reduce</li>
              </ul>
            </Accordion>
            <Accordion title="Решение алгоритмических задач">
              <ul className={styles.list}>
                <li className={styles.item}>Задача на уникальность символов</li>
                <li className={styles.item}>Задача на плоский массив</li>
                <li className={styles.item}>Задача на повернутую строку</li>
                <li className={styles.item}>Задача на анаграммы</li>
                <li className={styles.item}>Задача на поворот матрицы 3х3</li>
                <li className={styles.item}>Задача на сбалансированные скобки</li>
                <li className={styles.item}>Задача на простой поиск</li>
                <li className={styles.item}>Задача на простую очередь</li>
                <li className={styles.item}>Задача на универсальную сумму</li>
              </ul>
            </Accordion>
            <Accordion title="Общие советы по поведению на собеседованиях">
              <ul className={styles.list}>
                <li className={styles.item}>Как вести себя на собеседовании</li>
                <li className={styles.item}>Какие вопросы нужно задать работадателю</li>
              </ul>
            </Accordion>
          </div>
        </CSSTransition>
        {(!isTabletWidth) ? (
          <CSSTransition
            in={isVisibleInfoCircle}
            classNames="info-circle"
            timeout={500}
            unmountOnExit
          >
            <div className={styles.spinnerProgram}>
              <InfoCircle />
            </div>
          </CSSTransition>
        ) : null}
      </motion.div>
    </motion.section>
  );
};

export default OurProgram;
