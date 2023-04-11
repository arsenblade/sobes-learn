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

const AdminEditForm = (props: IAdminEditForm) => {
  const { user } = props;

  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>(user.password);
  const [isBanned, setIsBanned] = useState<boolean>(user.isBanned);
  const [isAdmin, setIsAdmin] = useState<boolean>(user.isAdmin);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isDiabled, setIsDisabled] = useState<boolean>(false);

  const { editUser } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (emailError === '' && passwordError === '') {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [emailError, passwordError]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const handleFormPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

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

  const handleFormEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!text
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )) {
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
    <form onSubmit={(e) => handleFormSubmit(e)} className={styles.adminEditform}>
      <label htmlFor="email" className={styles.inputLabel}>Email:</label>
      <FormInput id="email" type="email" defaultValue={email} onChange={(e) => handleFormEmail(e)} />
      <p className={styles.errorLabel}>{emailError}</p>

      <label htmlFor="password" className={styles.inputLabel}>Password:</label>
      <FormInput id="password" type="password" defaultValue={password} onChange={(e) => handleFormPassword(e)} />
      <p className={styles.errorLabel}>{passwordError}</p>
      <div className={styles.adminStatus}>
        <p>Сделать админом</p>
        <Checkbox
          className={styles.checkbox}
          onChange={(e) => setIsAdmin(e)}
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
