import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './RadioButton.module.scss';

interface IRadio {
  children: ReactNode,
  type: string,
  onChange?: (checked: boolean) => void,
  checked?: boolean,
  className?: string,
}

const RadioButton:FC<IRadio> = ({
  children, className, type, onChange, checked,
}) => (
  <label className={cn(styles.radioLabel, {
    [`${className}`]: className && className,
  })}
  >
    <input type="radio" onChange={(e) => onChange && onChange(e.currentTarget.checked)} className={styles.radioInput} name={type} checked={checked} />
    <span className={styles.fakeRadio} />
    <p className={styles.radioText}>{children}</p>
  </label>
);

export default RadioButton;
