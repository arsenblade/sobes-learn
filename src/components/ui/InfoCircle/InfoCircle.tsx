import { FC } from 'react';
import cn from 'classnames';
import styles from './InfoCircle.module.scss';

const circlePinkImg = require('../../../assets/img/circle-pink.png');

interface iInfoCircle {
  className?: string
}

const InfoCircle:FC<iInfoCircle> = ({ className }) => (
  <div className={cn(styles.circleContainer, className)}>
    <img src={circlePinkImg} alt="circle-pink" className={styles.circlePink} draggable={false} />
  </div>
);

export default InfoCircle;
