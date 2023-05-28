import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../ui/Button/Button';
import styles from './PresentCourse.module.scss';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const imgDeveloperDesktop = require('../../../../assets/img/developer-desktop.jpg');
const imgDeveloperMobile = require('../../../../assets/img/developer-mobile.jpg');

const presentAnimation = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PresentCourse = () => {
  const isTabletScreen = useMediaQuery('(max-width: 950px)');

  return (
    <motion.section
      className={styles.presentCourse}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
    >
      <motion.div className={styles.infoCourse} variants={presentAnimation}>
        <h1 className={styles.title}>Помогаем пройти собеседование на Frontend-разработчика</h1>
        <p className={styles.description}>
          Освойте в асинхронном режиме навыки, необходимые для собеседования на должность Frontend разработчика. Научитесь решать алгоритмиические задачи и грамотно отвечать на технические вопросы.
        </p>
        <a href="#ourProgram">
          <Button className={styles.btn} color="Pink">Подробнее</Button>
        </a>
      </motion.div>

      {!isTabletScreen ? (
        <img className={styles.img} width={355} height={420} src={imgDeveloperDesktop} alt="Картинка программиста." />
      ) : null}

      {isTabletScreen ? (
        <img className={styles.img} src={imgDeveloperMobile} alt="Картинка программиста." />
      ) : null}
    </motion.section>
  );
};

export default PresentCourse;
