import React, { useEffect, useState } from 'react';

import styles from './AdminUsersList.module.scss';
import AdminUserRow from './AdminUserRow';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { IUser } from '../../../../../types/user.types';
import FormInput from '../../../../ui/FormInput/FormInput';
import SearchInput from '../../../../ui/SearchInput/SearchInput';

const AdminUsersList = () => {
  const allUsers: IUser[] = useTypedSelector((state) => state.user.users);
  const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);

  const { getAllUsers } = useActions();

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) setSortedUsers(allUsers);
  }, [allUsers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortedUsers(allUsers.filter((user) => user.name.indexOf(e.target.value) !== -1));
  };

  return (
    <div className={styles.adminUsers}>
      <h1 className={styles.adminUsersTitle}>Пользователи</h1>
      <SearchInput placeholder="Поиск пользователя по имени" className={styles.searchInput} onChange={(e) => handleSearch(e)} />
      <table className={styles.userTable} width="100%">
        <thead>
          <tr>
            <th> </th>
            <th>Имя</th>
            <th>Email</th>
            <th>Дата регистрации</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersList;
