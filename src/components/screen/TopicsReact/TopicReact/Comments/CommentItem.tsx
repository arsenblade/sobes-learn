import { useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import { IComment } from '../../../../../types/topic.types';

import CommentForm from './CommentForm';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { useActions } from '../../../../../hooks/useActions';

const { v4: uuidv4 } = require('uuid');

interface ICommentComponent {
  comment: IComment;
  componentId: string
}

const Comment = (props: ICommentComponent) => {
  const avatarUrl = require('../../../../../assets/img/avatar.png');
  const [isFormActive, setIsFormActive] = useState(false);
  const { changeFormStatus } = useActions();
  const currentFormId = useTypedSelector((state) => state.comments.currentFormId);
  const { componentId, comment } = props;
  const {
    parentId, username, pubDate, commentText, replies, id,
  } = comment;
  const isReplyButtonShow = !parentId;

  const buttonReplyHandler = () => {
    setIsFormActive(!isFormActive);
    changeFormStatus(componentId);
  };

  useEffect(() => {
    console.log(currentFormId);
    if (currentFormId !== componentId) {
      setIsFormActive(false);
    }
  }, [currentFormId]);

  return (
    <>
      <div className={styles.comment}>
        <img alt="user-avatar" src={avatarUrl} />
        <div className={styles.commentMainInfo}>
          <div className={styles.commentInnerContainer}>
            <h2 className={styles.username}>{username}</h2>
            <p className={styles.date}>{pubDate}</p>
          </div>
          <div className={styles.commentOuterContainer}>
            <p>{commentText}</p>
            {isReplyButtonShow ? <button className={styles.buttonReply} onClick={buttonReplyHandler}>Ответить</button> : ''}
            {replies.map((comment) => <Comment comment={comment} componentId={uuidv4()} />)}
          </div>
        </div>
      </div>
      {isFormActive ? <CommentForm parentId={id} /> : ''}
    </>
  );
};

export default Comment;
