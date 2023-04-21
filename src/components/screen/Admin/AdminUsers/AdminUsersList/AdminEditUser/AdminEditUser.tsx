import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../../../../../../service/user/user.service';
import { IUser } from '../../../../../../types/user.types';
import styles from './AdminEditUser.module.scss';
import AdminEditForm from './AdminEditForm';

const AdminEditUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState<IUser>();

  async function getUser(id: string) {
    const { data: userData } = await userService.getById(id);
    setUser(userData);
  }

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, []);

  if (user) {
    return (
      <div className={styles.adminEditContainer}>
        <div className={styles.adminEditHeader}>
          <h1 className={styles.adminUserEditTitle}>
            Пользователь
            <span className={styles.pinkSpan}>{user.name}</span>
          </h1>
        </div>
        <AdminEditForm user={user} />
      </div>
    );
  }

  return (
    <div className={styles.adminEditContainer}>
      <div className={styles.adminEditHeader}>
        <h1 className={styles.adminUserEditTitle}>
          Загрузка...
        </h1>
      </div>
    </div>
  );
};

export default AdminEditUser;
