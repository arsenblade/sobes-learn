import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import AdminDeleteModal from './AdminDeleteModal/AdminDeleteModal';
import styles from './AdminUsersList.module.scss';
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

  const cellStyle = cn({
    [styles.redBanText]: isBanned,
    [styles.blueText]: isAdmin && !isBanned,
    [styles.whiteText]: !isBanned && !isAdmin,
  });

  const banUserHandler = () => {
    const banUserProps: IBanUser = {
      id,
      banStatus: !isBanned,
    };
    banUser(banUserProps);
  };

  const getUserStatus = () => {
    if (isBanned) return '(Забанен)';
    if (isAdmin) return '(Админ)';
    return '';
  };

  return (
    <>
      <div><img alt="user avatar" src={photoUser} className={styles.userColumnAvatar} /></div>
      <div className={cellStyle}>
        <p>
          {name}
          {' '}
          {getUserStatus()}
        </p>
      </div>
      <div className={cellStyle}><p>{email}</p></div>
      <div className={cellStyle}><p>{regDate}</p></div>
      <div className={styles.userColumnActions}>
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
      </div>
    </>
  );
};

export default AdminUserRow;
