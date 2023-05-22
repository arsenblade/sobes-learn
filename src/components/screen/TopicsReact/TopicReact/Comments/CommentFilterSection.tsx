import cn from 'classnames';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import styles from '../TopicReact.module.scss';

const CommentsFilterSection = () => {
  const { sortByLikes, sortByDate } = useActions();
  const sortType = useTypedSelector((state) => state.comments.currentSortType);

  return (
    <div className={styles.sortSection}>
      <p>Отсортировать:</p>
      <div className={styles.sortButtons}>
        <button className={cn(styles.sortButton, { [styles.sortButtonActive]: sortType === 'likes' })} onClick={() => sortByLikes()}>По лайкам</button>
        <button
          className={cn(
            styles.sortButton,
            { [styles.sortButtonActive]: sortType !== 'likes' },
          )}
          onClick={() => sortByDate()}
        >
          По дате
          {' '}
          {sortType === 'dateDown' ? '(Сначала новые)' : ''}
          {sortType === 'dateUp' ? '(Сначала старые)' : ''}
        </button>
      </div>
    </div>
  );
};

export default CommentsFilterSection;
