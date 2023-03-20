import { useEffect, useState } from 'react';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import Button from '../../../../ui/Button/Button';
import styles from '../TopicReact.module.scss';
import CommentForm from './CommentForm/CommentForm';
import Comment from './Comment/CommentItem';

interface ICommentsSection {
  topicId: string;
}

const CommentsSection = (props: ICommentsSection) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { changeFormStatus, getCommentsById } = useActions();

  const commentsTopic = useTypedSelector((state) => state.comments.currentTopicComments);
  const currentFormId = useTypedSelector((state) => state.comments.currentFormId);

  const componentId = 'main-form';

  useEffect(() => {
    getCommentsById(props);
  }, []);

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
      <h1>10 Комментариев:</h1>
      {isFormOpen ? '' : <Button color="Pink" onClick={placeCommentButtonHandler} className={styles.showFormButton}>Оставить комментарий</Button>}
      {isFormOpen ? <CommentForm /> : ''}
      {commentsTopic.comments.map((comment) => <Comment {...comment} />)}
    </div>
  );
};

export default CommentsSection;
