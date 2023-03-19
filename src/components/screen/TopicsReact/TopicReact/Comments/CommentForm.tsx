import React, { useEffect, useState } from 'react';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import Button from '../../../../ui/Button/Button';
import Textarea from '../../../../ui/Textarea/Textarea';
import styles from './CommentForm.module.scss';

interface ICommentForm {
  parentId?: string
}

const CommentForm = ({ parentId }: ICommentForm) => {
  const avatarUrl = require('../../../../../assets/img/avatar.png');
  const [commentText, setCommentText] = useState('');
  const { addComment } = useActions();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [inputError, setInputError] = useState('    ');
  const topicId = useTypedSelector((state) => state.comments.currentTopicComments.id);
  const user = useTypedSelector((state) => state.auth.user);
  const isLoading = useTypedSelector((state) => state.comments.isLoading);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    if (!e.target.value.trim()) {
      setInputError('*Комментарий не может быть пустым');
      return;
    }
    if (e.target.value.length > 150) {
      setInputError('*Комментарий слишком большой');
      return;
    }
    setInputError('');
  };

  useEffect(() => {
    setIsSubmitDisabled(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (inputError === '') {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [inputError]);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const newComment = {
      userId: user?.id || '',
      username: user?.name || '',
      text: commentText,
      topicId,
      parentId: parentId || '',
    };
    e.preventDefault();
    addComment(newComment);
  };

  return (
    <div className={styles.commentForm}>
      <img alt="user-avatar" src={avatarUrl} className={styles.formAvatar} />
      <form className={styles.commentFormMainInfo} onSubmit={(e) => formSubmitHandler(e)}>
        <Textarea placeholder="Введите текст" onChange={(e) => inputHandler(e)} className={styles.commentFormInput} />
        <span>{inputError}</span>
        <button className={styles.buttonContainer} disabled={isSubmitDisabled} type="submit">
          <Button className={styles.submitButton} color="Pink" disabled={isSubmitDisabled}>Отправить</Button>
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
