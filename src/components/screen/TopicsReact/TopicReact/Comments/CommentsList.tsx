import { useEffect, useState } from 'react';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import Button from '../../../../ui/Button/Button';
import styles from '../TopicReact.module.scss';
import CommentForm from './CommentForm/CommentForm';
import Comment from './Comment/CommentItem';
import { useAuth } from '../../../../../hooks/useAuth';
import { commentWordParse } from '../../../../../utils/commentWordParser';
import CommentsFilterSection from './CommentFilterSection';

interface ICommentsSection {
  topicId: string;
}

const CommentsSection = ({ topicId }: ICommentsSection) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState<number>(0);

  const userId = useAuth().user?.id;

  const {
    changeFormStatus, getCommentsById, getAllRanks,
  } = useActions();

  const commentsTopic = useTypedSelector((state) => state.comments.currentTopicComments);
  const currentFormId = useTypedSelector((state) => state.comments.currentFormId);

  const componentId = 'main-form';

  useEffect(() => {
    getCommentsById({ topicId });
    getAllRanks();
  }, []);

  useEffect(() => {
    let count: number = 0;
    commentsTopic.comments.forEach((comment) => {
      count += 1 + comment.replies.length;
    });
    setCommentsCount(count);
  }, [commentsTopic]);

  const placeCommentButtonHandler = () => {
    setIsFormOpen(true);
    changeFormStatus(componentId);
  };

  useEffect(() => {
    if (currentFormId !== componentId) {
      setIsFormOpen(false);
    }
  }, [currentFormId]);

  return (
    <div className={styles.commentsContainer}>
      <hr />
      <h1>
        {commentsCount}
        {' '}
        {commentWordParse(commentsCount)}
        :
      </h1>
      {isFormOpen ? '' : <Button color="Pink" onClick={placeCommentButtonHandler} className={styles.showFormButton}>Оставить комментарий</Button>}
      {isFormOpen ? <CommentForm /> : ''}
      {commentsCount > 0 ? <CommentsFilterSection /> : ''}
      {commentsTopic.comments.map((comment) => <Comment comment={comment} userId={userId} />)}
    </div>
  );
};

export default CommentsSection;
