import { FC } from 'react';
import classNames from 'classnames';
import cls from './PageError.module.scss';
import Button from '../../components/ui/Button/Button';

interface PageErrorProps {
    className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.pageError, {}, [className])}>
      <p>Произошла непредвиденная ошибка</p>
      <Button onClick={reloadPage} color="Pink">
        Обновить страницу
      </Button>
    </div>
  );
};
