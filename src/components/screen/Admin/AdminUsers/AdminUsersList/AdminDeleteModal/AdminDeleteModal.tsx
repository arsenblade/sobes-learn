import { Dispatch, SetStateAction, useState } from 'react';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import Button from '../../../../../ui/Button/Button';
import styles from './AdminDeleteModal.module.scss';

interface IAdminModal {
  acceptButton: () => void,
  declineButton: () => void,
  title: string
}

const AdminDeleteModal = (props: IAdminModal) => {
  const { acceptButton, declineButton, title } = props;
  const isLoading = useTypedSelector((state) => state.user.isLoading);

  return (
    <div className={styles.adminModal}>
      <div className={styles.adminModalMain}>
        <p className={styles.acceptDeleteTitle}>{title}</p>
        <div className={styles.adminModalButtonsContainer}>
          <Button className={styles.confirmDeletebutton} disabled={isLoading} color="Violet" onClick={acceptButton}>Да</Button>
          <Button className={styles.confirmDeletebutton} disabled={isLoading} color="White" onClick={declineButton}>Нет</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal;
