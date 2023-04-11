import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import userEvent from '@testing-library/user-event';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import Button from '../../../../ui/Button/Button';
import AdminDeleteModal from './AdminDeleteModal/AdminDeleteModal';
import styles from './AdminUsersList.module.scss';
import { banUser } from '../../../../../store/user/user.actions';
import { IBanUser } from '../../../../../store/user/user.interface';

const photoUser = require('../../../../../assets/img/avatar-small.jpg');
const pencilImg = require('../../../../../assets/img/edit-white.png');
const xmarkImg = require('../../../../../assets/img/x-mark-white.png');
const checkImg = require('../../../../../assets/img/check.png');

interface IUserColumn {
  id: string,
  email: string,
  regDate: string,
  name: string,
  isBanned: boolean,
  isAdmin: boolean
}

const AdminUserRow = (props: IUserColumn) => {
  const {
    id, email, regDate, name, isBanned, isAdmin,
  } = props;

  const { banUser, changeModalStatus } = useActions();
  const modalStatus = useTypedSelector((state) => state.user.modalId);

  const navigate = useNavigate();

  const banUserHandler = () => {
    const banObj: IBanUser = {
      id,
      banStatus: !isBanned,
    };
    banUser(banObj);
  };

  const getUserStatus = () => {
    if (isBanned) return '(Забанен)';
    if (isAdmin) return '(Админ)';
    return '';
  };

  return (
    <tr className={cn({
      [styles.redBanText]: isBanned,
      [styles.blueText]: isAdmin && !isBanned,
      [styles.whiteText]: !isBanned && !isAdmin,
    })}
    >
      <td width="5%"><img alt="user avatar" src={photoUser} className={styles.userColumnAvatar} /></td>
      <td width="35%">
        {name}
        {' '}
        {getUserStatus()}
      </td>
      <td width="30%">{email}</td>
      <td width="30%">{regDate}</td>
      <td className={styles.userColumnActions}>
        {modalStatus === id ? (
          <AdminDeleteModal
            acceptButton={banUserHandler}
            declineButton={() => changeModalStatus('')}
            title={`Вы действительно хотите ${isBanned ? 'разбанить' : 'забанить'} пользователя?`}
          />
        ) : ''}
        <button
          title="Отредактировать пользователя"
          onClick={() => navigate(`/manage/user/${id}`)}
        >
          <img alt="edit user" src={pencilImg} className={styles.actionButtonImg} />
        </button>
        <button
          title={isBanned ? 'Разбанить пользователя' : 'Забанить пользователя'}
          onClick={() => changeModalStatus(id)}
        >
          <img alt="ban user" src={isBanned ? checkImg : xmarkImg} className={styles.actionButtonImg} />
        </button>
      </td>
    </tr>
  );
};

export default AdminUserRow;
