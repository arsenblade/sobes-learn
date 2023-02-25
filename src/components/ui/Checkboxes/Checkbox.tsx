import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Checkbox.module.scss';

interface ICheckbox {
  children?: ReactNode,
  onChange?: (checked: boolean) => void,
  checked?: boolean,
  className?: string
}

const Checkbox:FC<ICheckbox> = ({
  children, className, onChange, checked,
}) => (
  <label className={cn(styles.checkboxLabel, {
    [`${className}`]: className && className,
  })}
  >
    <input type="checkbox" onChange={(e) => onChange && onChange(e.currentTarget.checked)} className={styles.checkboxInput} checked={checked} />
    <span className={styles.fakeCheckbox} />
    <p className={styles.checkboxText}>{children}</p>
  </label>
);

export default Checkbox;
