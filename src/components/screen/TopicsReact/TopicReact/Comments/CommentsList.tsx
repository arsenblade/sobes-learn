import { useEffect } from 'react';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import styles from '../TopicReact.module.scss';
import Comment from './CommentItem';

const { v4: uuidv4 } = require('uuid');

interface ICommentsSection {
  topicId: string;
}

const CommentsSection = (props: ICommentsSection) => {
  const { topicId } = props;
  const commentsTopic = useTypedSelector((state) => state.comments.currentTopicComments);

  const { getCommentsById } = useActions();
  useEffect(() => {
    getCommentsById(topicId);
  }, []);

  return (
    <div className={styles.commentsContainer}>
      <hr />
      <h1>10 Комментариев:</h1>
      {commentsTopic.comments.map((comment) => <Comment comment={comment} componentId={uuidv4()} />)}
    </div>
  );
};

export default CommentsSection;
