import cn from 'classnames';
import styles from './Comment.module.scss';
import { useActions } from '../../../../../../hooks/useActions';

interface ICommentHover {
  commentId: string,
  topicId: string,
  parentId?: string
}

const CommentHover = ({ commentId, topicId, parentId } : ICommentHover) => {
  const xmark = require('../../../../../../assets/img/x-mark-white.png');
  const { deleteComment } = useActions();
  return (
    <div className={cn(styles.deleteHover, styles.deleteHoverRemoved)}>
      <button onClick={() => deleteComment({ commentId, topicId, parentId })}>
        <img title="Удалить комментарий" alt="x-mark" src={xmark} />
      </button>
    </div>
  );
};

export default CommentHover;
