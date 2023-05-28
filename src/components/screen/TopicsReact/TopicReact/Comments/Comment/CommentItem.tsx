import React, { useEffect, useState } from 'react';

import styles from './Comment.module.scss';
import { IComment } from '../../../../../../types/topic.types';

import CommentForm from '../CommentForm/CommentForm';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import { useActions } from '../../../../../../hooks/useActions';
import { useAuth } from '../../../../../../hooks/useAuth';
import CommentRank from './CommentRank';
import { stringToText } from '../../../../../../utils/dateParsers';
import CommentHover from './CommentHover';

interface ICommentComponent {
  comment: IComment,
  userId: string | undefined;
}

const Comment = ({ comment, userId } : ICommentComponent) => {
  const avatarUrl = require('../../../../../../assets/img/avatar3.jpg');

  const {
    id, commentText, replies, pubDate, username,
  } = comment;
  const { changeFormStatus } = useActions();

  const currentFormId = useTypedSelector((state) => state.comments.currentFormId);
  const topicId = useTypedSelector((state) => state.comments.currentTopicComments.id);
  const auth = useAuth();

  const [isFormActive, setIsFormActive] = useState(false);
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
    <div className={styles.comment}>
      <img alt="user-avatar" src={avatarUrl} className={styles.commentUserAvatar} />
      <div className={styles.commentMainInfo}>
        <div className={styles.commentTitleDate}>
          <h2 className={styles.commentUsername}>{username}</h2>
          <p className={styles.commentDate}>{stringToText(pubDate)}</p>
        </div>
        <p className={styles.commentText}>{commentText}</p>
        <div className={styles.commentActiveBlock}>
          <div className={styles.commentActiveBlockRanks}>
            <CommentRank id={id} userId={userId} />
          </div>
          {comment.parentId === '' || !comment.parentId ? <button className={styles.buttonReply} onClick={buttonReplyHandler}>Ответить</button> : ''}
        </div>
        <div className={styles.commentOuterContainer}>
          {isFormActive ? <CommentForm parentId={id} /> : ''}
          {replies.map((comment) => <Comment comment={comment} userId={userId} />)}
        </div>
      </div>
      {auth.user?.isAdmin ? <CommentHover commentId={comment.id} topicId={topicId} parentId={comment.parentId} /> : ''}
    </div>
  );
};

export default Comment;
