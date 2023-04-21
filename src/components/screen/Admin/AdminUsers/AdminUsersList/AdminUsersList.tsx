import React, { useEffect, useState } from 'react';

import styles from './AdminUsersList.module.scss';
import AdminUserRow from './AdminUserRow';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { IUser } from '../../../../../types/user.types';
import SearchInput from '../../../../ui/SearchInput/SearchInput';

const AdminUsersList = () => {
  const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);

  const { getAllUsers } = useActions();

  const allUsers: IUser[] = useTypedSelector((state) => state.user.users);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) setSortedUsers(allUsers);
  }, [allUsers]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortedUsers(allUsers.filter((user) => user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1));
  };

  return (
    <div className={styles.adminUsers}>
      <h1 className={styles.adminUsersTitle}>Пользователи</h1>
      <SearchInput placeholder="Поиск пользователя по имени" className={styles.searchInput} onChange={(event) => handleSearch(event)} />
      <div className={styles.userTable}>
        <div> </div>
        <div><p>Имя</p></div>
        <div><p>Email</p></div>
        <div><p>Дата регистрации</p></div>
        <div><p>Действия</p></div>
        {sortedUsers?.map((user) => (
          <AdminUserRow
            id={user.id}
            email={user.email}
            name={user.name}
            regDate={user.regDate}
            isBanned={user.isBanned}
            isAdmin={user.isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminUsersList;
