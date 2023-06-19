import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../ui/Button/Button';
import styles from './PaymentCourse.module.scss';
import { MyToast } from '../../../ui/MyToast/MyToast';

const titleAnimation = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const contentAnimation = {
  hidden: {
    x: 20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const PaymentCourse = () => (
  <div className={styles.container}>
    <motion.div
      className={styles.paymentCourse}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      style={{ overflow: 'hidden' }}
    >
      <motion.h2
        className={styles.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
        variants={titleAnimation}
      >
        Записаться и оплатить курс
        «React-разработчик»
      </motion.h2>
      <motion.div
        className={styles.containerPrice}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
        variants={contentAnimation}
      >
        <h2 className={styles.price}>1999</h2>
        <span className={styles.priceNoDiscount}>3999₽</span>
      </motion.div>
      <Button
        className={styles.btn}
        color="Pink"
        variants={titleAnimation}
        onClick={() => MyToast('Пока нет возможности оплатить курс', false)}
      >
        Оплатить
      </Button>
    </motion.div>
  </div>
);

export default PaymentCourse;
