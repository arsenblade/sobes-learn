import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';

interface IModal {
  className?: string,
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  count: number
}

const Modal:FC<IModal> = ({
  className, active, setActive, count,
}) => {
  // eslint-disable-next-line no-undef
  let timer: string | number | NodeJS.Timeout | undefined;
  let textNumber;

  if (active) {
    timer = setTimeout(() => { setActive(false); clearTimeout(timer); }, 3000);
    timer = undefined;
  }

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    textNumber = 'баллов';
  } else if (lastDigit === 1) {
    textNumber = 'балл';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    textNumber = 'балла';
  } else {
    textNumber = 'баллов';
  }

  const closeModalHandler = () => {
    clearTimeout(timer);
    setActive(false);
  };
  return (
    <div className={cn(styles.modal, { [styles.modalActive]: active })} onClick={closeModalHandler}>
      <div className={cn(styles.modalContainer, { [styles.modalContainerActive]: active })} onClick={closeModalHandler}>
        <h1 className={cn(styles.modalContent, styles.modalContentNumber)}>{count}</h1>
        <p className={cn(styles.modalContent, styles.modalContentText)}>{textNumber}</p>
      </div>
    </div>
  );
};

export default Modal;
