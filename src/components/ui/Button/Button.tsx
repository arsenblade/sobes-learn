import { ReactNode, forwardRef } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import styles from './Button.module.scss';

interface IButton {
  children: ReactNode
  color: 'Pink' | 'White' | 'Violet' | 'Red' | 'Green'
  disabled?: boolean,
  className?: string,
  onClick?: () => void
}

const Button = forwardRef<HTMLDivElement, IButton>(({
  color, className, children, onClick, disabled,
}, ref) => (
  <div
    ref={ref}
    className={cn(styles.btn, {
      [styles.btnWhite]: color === 'White',
      [styles.btnPink]: color === 'Pink',
      [styles.btnViolet]: color === 'Violet',
      [styles.btnRed]: color === 'Red',
      [styles.btnGreen]: color === 'Green',
      [`${className}`]: className && className,
      [styles.disabled]: disabled,
      [styles.noDisabled]: !disabled,
    })}
    onClick={() => onClick && !disabled && onClick()}
  >
    {children}
    <span className={styles.spanOne} />
    <span className={styles.spanTwo} />
    <span className={styles.spanThree} />
    <span className={styles.spanFour} />
  </div>
));

export default motion(Button);
