import React, { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './FormInput.module.scss';

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {}
const FormInput = React.forwardRef<HTMLInputElement, IFormInput>(({ className, ...rest }, ref) => (
  <input ref={ref} className={cn(styles.formInput, className)} {...rest} />
));

export default FormInput;
