import React, { FC, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './TextArea.module.scss';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(({ className, ...rest }, ref) => (
  <textarea ref={ref} className={cn(styles.textArea, className)} {...rest} />
));

export default Textarea;
