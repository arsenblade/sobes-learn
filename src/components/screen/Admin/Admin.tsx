import { FC } from 'react';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminStatistics from './AdminStatistics/AdminStatistics';
import styles from './Admin.module.scss';
import AdminCreateTopic from './AdminCreateTopic/AdminCreateTopic';
import Footer from '../Footer/Footer';
import AdminUsersList from './AdminUsers/AdminUsersList/AdminUsersList';
import AdminEditUser from './AdminUsers/AdminUsersList/AdminEditUser/AdminEditUser';

interface AdminProps {
  type: 'statistics' | 'createTopic' | 'editUser' | 'usersList'
}

const Admin:FC<AdminProps> = ({ type }) => (
  <div className={styles.admin}>
    <AdminHeader />
    <div className={styles.adminContent}>
      {type === 'createTopic' && <AdminCreateTopic />}
      {type === 'statistics' && <AdminStatistics />}
      {type === 'usersList' && <AdminUsersList />}
      {type === 'editUser' && <AdminEditUser />}
    </div>
    <Footer className={styles.footer} color="white" />
  </div>
);

export default Admin;
