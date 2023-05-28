import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getSalary } from '../../../../utils/getSalary';
import RangeSlider from '../../../ui/RangeSlider/RangeSlider';
import styles from './AfterLearnCourse.module.scss';

const itemAnimation = {
  hidden: {
    x: 20,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

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

const AfterLearnCourse = () => {
  const [valueSalary, setValueSalary] = useState([40]);

  return (
    <section className={styles.afterLearnCourse}>
      <svg className={styles.imageDeveloper} width="335" height="418" viewBox="0 0 335 418" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M238.408 223.881C259.233 231.241 279.067 239.581 295.429 252.828C302.371 258.225 306.337 266.075 306.337 274.906L315.262 350.953C315.758 354.388 314.271 357.822 311.296 359.784C302.867 365.181 293.942 369.597 284.521 372.541V388.241H297.908C306.337 384.806 314.767 380.881 322.204 375.975C331.129 370.088 336.088 359.294 334.6 348.5L326.667 274.416C326.171 260.187 319.725 246.941 308.321 238.109C289.975 222.9 268.158 213.578 245.35 205.728L221.054 195.916C219.071 194.934 218.079 193.462 218.079 191.5V179.725C236.921 165.006 247.829 142.438 247.829 118.397V100.734C250.804 102.697 254.275 103.187 257.746 103.678L249.317 79.1469C248.325 75.7125 247.333 72.2781 246.837 68.8438C242.871 40.8781 226.012 21.2531 202.708 8.98751C200.725 8.00627 198.246 8.00626 196.262 9.47813L191.8 12.9125L186.842 6.04374C185.354 4.08123 183.371 2.11876 180.892 1.62814C176.429 0.64689 171.967 0.15625 167.504 0.15625C128.333 0.15625 95.6083 30.575 88.6666 70.3156V73.75V82.0906C88.6666 92.8844 86.6833 103.188 82.2208 113L73.7916 132.625C73.7916 132.625 79.7416 131.153 89.6583 128.209C92.1375 148.325 102.55 166.478 118.417 178.744V191.009C118.417 192.972 117.425 194.934 115.442 195.425L91.1458 205.238C68.3375 213.088 46.5208 222.409 28.175 237.619C16.7708 246.45 9.82914 259.697 9.33331 273.925L0.904154 348.5C-0.583346 359.294 4.37499 370.088 13.3 375.975C20.7375 380.881 29.1666 384.806 37.5958 388.241H51.4791V373.031C42.0583 369.597 33.1333 365.672 24.7042 360.275C21.7292 358.312 20.2417 354.878 20.7375 351.444L29.1666 275.887V274.906C29.1666 266.075 33.6292 258.225 40.5708 252.828C56.9333 239.581 76.7667 231.241 97.5917 223.881L105.525 221.428C119.904 230.259 142.712 235.656 168 235.656C193.287 235.656 216.096 230.259 230.971 221.428L238.408 223.881ZM108.5 122.322C142.217 111.037 190.808 91.4125 212.625 63.9375C217.087 70.8063 222.046 77.1844 227.5 83.5625V117.906C227.5 150.288 200.725 176.781 168 176.781C136.762 176.781 110.979 153.231 108.5 122.322ZM128.333 210.634C134.283 206.219 138.25 198.859 138.25 191.009V190.519C157.092 198.369 178.908 198.369 197.75 190.519V191.009C197.75 198.369 201.221 205.728 207.171 210.634C194.279 214.559 180.892 216.522 167.504 216.031C154.612 216.031 141.225 214.069 128.333 210.634Z" fill="#FF44B4" />
        <path d="M275.1 276.378C275.1 269.509 269.646 264.113 262.704 264.113H73.7917C66.85 264.113 61.3958 269.509 61.3958 276.378V398.544H23.7125V404.922C23.7125 411.791 29.1666 417.188 36.1083 417.188H300.387C307.329 417.188 312.783 411.791 312.783 404.922V398.544H275.1V276.378ZM142.217 357.331L135.275 364.2L107.508 336.725L135.275 309.25L142.217 316.119L121.392 336.725L142.217 357.331ZM161.058 367.634L152.133 363.709L175.438 308.269L184.363 312.194L161.058 367.634ZM200.725 364.691L193.783 357.822L214.608 337.216L193.783 316.609L200.725 309.741L228.492 337.216L200.725 364.691Z" fill="#FF44B4" />
      </svg>

      <svg className={styles.imageHourglass} width="180" height="278" viewBox="0 0 180 278" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.1948 25.7938C15.1948 61.4179 34.7844 85.1768 51.1013 104.164C61.5506 116.832 70.6792 128.697 71.9883 139C70.6792 149.289 61.5506 161.154 51.1013 173.034C34.7844 192.823 15.1948 216.568 15.1948 252.192H31.5117C31.5117 225.28 47.1857 206.279 62.1935 188.08C75.2493 173.034 86.9961 158.001 87.6507 140.591V139V138.212C86.9961 119.998 75.2493 105.755 62.1935 90.7227C47.1857 71.7069 31.5117 52.7197 31.5117 25.7938H15.1948Z" fill="#FF44B4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M150.055 25.8082C150.055 53.4219 134.778 72.3374 119.501 90.4934C107.404 105.482 95.9493 120.457 94.687 137.811V139.387V140.189C95.9493 158.331 107.404 172.518 119.501 187.507C134.778 205.663 150.055 225.381 150.055 252.192H165.962C165.962 216.697 146.233 193.038 130.968 173.32C120.775 160.695 111.226 148.859 110.595 138.613C111.226 128.353 120.775 117.305 130.968 104.68C146.875 84.9621 165.962 61.3034 165.962 25.8082H150.055Z" fill="#FF44B4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M53.7778 71.6495C59.5752 79.5023 66.67 88.1432 73.7648 95.996C79.5622 103.061 84.7168 111.687 88.5857 121.116C89.8831 123.466 90.5259 126.605 91.1687 128.955C91.1687 128.181 91.8116 126.605 91.8116 125.831C93.0974 121.116 95.0375 117.19 96.9661 113.264C101.489 106.199 106.001 99.12 111.156 92.8579C116.965 85.7932 123.405 78.7285 128.571 71.6495H53.7778Z" fill="#FF44B4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0.0144043V20.0619H179.988V0.0144043H0Z" fill="#FF44B4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 257.953V278H179.988V257.953H0Z" fill="#FF44B4" />
      </svg>

      <motion.div
        className={styles.knowledgeAfterCourse}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: true }}
        style={{ overflow: 'hidden' }}
      >
        <motion.h2 className={styles.title} variants={titleAnimation}>
          Чему вы научитесь после подготовки к собеседованию на Frontend разработчика:
        </motion.h2>
        <motion.ul
          className={styles.knowledgeList}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
        >
          <motion.li className={styles.knowledgeItem} variants={itemAnimation} custom={1}>
            решать алгоритмические задачи
          </motion.li>
          <motion.li className={styles.knowledgeItem} variants={itemAnimation} custom={2}>
            отвечать на теоретические вопросы по языку, вёртске и фреймворкам
          </motion.li>
          <motion.li className={styles.knowledgeItem} variants={itemAnimation} custom={3}>
            как правильно вести себя на собеседовании
          </motion.li>
        </motion.ul>
      </motion.div>
      <motion.div
        className={styles.salaryAfterCourse}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: true }}
        style={{ overflow: 'hidden' }}
      >
        <motion.h2 className={styles.title} variants={titleAnimation}>После обучения вы можете претендовать на зарпалату junior-разработчика</motion.h2>
        <p className={styles.salaryText}>
          Ваша будущая зарплата –
          <span>
            {getSalary(valueSalary)}
            {' '}
            ₽
          </span>
        </p>
        <motion.div
          className={styles.rangeSlider}
          variants={itemAnimation}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
        >
          <span className={styles.junLvlText}>Junior</span>
          <span className={styles.midLvlText}>Middle</span>
          <span className={styles.senLvlText}>Senior</span>
          <RangeSlider values={valueSalary} setValues={setValueSalary} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AfterLearnCourse;
