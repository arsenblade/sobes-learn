import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { IUser } from '../../../../../../types/user.types';
import styles from './AdminEditUser.module.scss';
import FormInput from '../../../../../ui/FormInput/FormInput';
import Checkbox from '../../../../../ui/Checkboxes/Checkbox';
import Button from '../../../../../ui/Button/Button';
import { useActions } from '../../../../../../hooks/useActions';
import { IEditUserState } from '../../../../../../store/user/user.interface';

interface IAdminEditForm {
  user: IUser;
}

const AdminEditForm = ({ user }: IAdminEditForm) => {
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>(user.password);
  const [isBanned, setIsBanned] = useState<boolean>(user.isBanned);
  const [isAdmin, setIsAdmin] = useState<boolean>(user.isAdmin);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isDiabled, setIsDisabled] = useState<boolean>(false);

  const { editUser } = useActions();
  const navigate = useNavigate();

  const emailRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (emailError === '' && passwordError === '') {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [emailError, passwordError]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === user.email && isAdmin === user.isAdmin && isBanned === user.isBanned && password === user.password) {
      navigate('/manage/users/list');
      return;
    }
    const newUser: IEditUserState = {
      email,
      id: user.id,
      isAdmin,
      isBanned,
      name: user.name,
      password,
    };
    editUser(newUser);
    navigate('/manage/users/list');
  };

  const handleFormPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (text.length < 7) {
      if (text.trim().length === 0) {
        setPasswordError('* Пароль не может быть пустым');
        return;
      }
      setPasswordError('* Длина пароля должна быть не меньше 6');
      return;
    }
    if (text.length > 18) {
      setPasswordError('* Длина пароля должна быть не больше 18');
      return;
    }
    setPassword(text);
    setPasswordError('');
  };

  const handleFormEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (!text
      .toLowerCase()
      .match(emailRegular)) {
      if (text.trim().length === 0) {
        setEmailError('* Email не может быть пустым');
        return;
      }
      setEmailError('* Неправильный формат email');
      return;
    }
    setEmail(text);
    setEmailError('');
  };

  return (
    <form onSubmit={(event) => handleFormSubmit(event)} className={styles.adminEditform}>
      <label htmlFor="email" className={styles.inputLabel}>Email:</label>
      <FormInput id="email" type="email" defaultValue={email} onChange={(event) => handleFormEmail(event)} />
      <p className={styles.errorLabel}>{emailError}</p>

      <label htmlFor="password" className={styles.inputLabel}>Password:</label>
      <FormInput id="password" type="password" defaultValue={password} onChange={(event) => handleFormPassword(event)} />
      <p className={styles.errorLabel}>{passwordError}</p>
      <div className={styles.adminStatus}>
        <p>Сделать админом</p>
        <Checkbox
          className={styles.checkbox}
          onChange={(event) => setIsAdmin(event)}
          checked={isAdmin}
        />
      </div>
      <div className={styles.editUserButtonsContainer}>
        <button type="submit" disabled={isDiabled}>
          <Button color="Pink" disabled={isDiabled}>Изменить</Button>
        </button>
        {email !== '' ? <Button onClick={() => setIsBanned(!isBanned)} color={isBanned ? 'Green' : 'Red'}>{isBanned ? 'Разбанить' : 'Забанить'}</Button> : ''}
      </div>
    </form>
  );
};

export default AdminEditForm;
