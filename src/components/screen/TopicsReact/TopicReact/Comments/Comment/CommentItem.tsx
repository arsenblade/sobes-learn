import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import { IComment } from '../../../../../../types/topic.types';

import CommentForm from '../CommentForm/CommentForm';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import { useActions } from '../../../../../../hooks/useActions';

const Comment = (comment: IComment) => {
  const avatarUrl = require('../../../../../../assets/img/avatar.png');

  const [isFormActive, setIsFormActive] = useState(false);

  const { changeFormStatus } = useActions();

  const currentFormId = useTypedSelector((state) => state.comments.currentFormId);

  const {
    parentId, username, pubDate, commentText, replies, id,
  } = comment;
  const isReplyButtonShow = !parentId;

  useEffect(() => {
    if (currentFormId === 'init') {
      return;
    }
    if (currentFormId !== id) {
      setIsFormActive(false);
    }
  }, [currentFormId]);

  const buttonReplyHandler = () => {
    setIsFormActive(!isFormActive);
    changeFormStatus(id);
  };

  return (
    <>
      <div className={styles.comment}>
        <img alt="user-avatar" src={avatarUrl} className={styles.commentUserAvatar} />
        <div className={styles.commentMainInfo}>
          <div className={styles.commentInnerContainer}>
            <h2 className={styles.username}>{username}</h2>
            <p className={styles.date}>{pubDate}</p>
          </div>
          <div className={styles.commentOuterContainer}>
            <p>{commentText}</p>
            {isReplyButtonShow ? <button className={styles.buttonReply} onClick={buttonReplyHandler}>Ответить</button> : ''}
            {replies.map((comment) => <Comment {...comment} />)}
          </div>
        </div>
      </div>
      {isFormActive ? <CommentForm parentId={id} /> : ''}
    </>
  );
};

export default Comment;
