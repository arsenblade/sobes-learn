import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.adminHeader}>
      <h1 className={styles.title}>Панель администратора</h1>
      <div className={styles.containerLink}>
        <Link
          className={cn(styles.link, styles.statistics, {
            [styles.currentActiveStatistics]: pathname === '/manage/statistics',
          })}
          to="/manage/statistics"
        >
          <span>Статистика</span>
        </Link>
        {/* <Link */}
        {/*  className={cn(styles.link, styles.createTopic, { */}
        {/*    [styles.currentActiveCreateTopic]: pathname === '/manage/create/topic', */}
        {/*  })} */}
        {/*  to="/manage/create/topic" */}
        {/* > */}
        {/*  <span>Добавить темы</span> */}
        {/* </Link> */}
        <Link
          className={cn(styles.link, styles.userEditIcon, {
            [styles.currentActiveUserEdit]: pathname === '/manage/users/list',
          })}
          to="/manage/users/list"
        >
          <span>Пользователи</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
