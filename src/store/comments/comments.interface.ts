import { IComment, IRank } from '../../types/topic.types';

export interface ICommentsState {
  currentTopicComments: ICommentsStateElement,
  isLoading: boolean,
  currentFormId: string,
  isRankLoading: boolean,
  prevStateComments: IComment[] | null,
  currentSortType: 'dateUp' | 'likes' | 'dateDown',
  error: string,
  ranks: IRank[],
  sortedRanks: IRank[]
}

export interface ICommentsStateElement {
  id: string,
  comments: IComment[]
}

export interface ICommentsRanks {
  commentsState: ICommentsStateElement,
  ranks: IRank[]
}

export interface IAddComment {
  userId: string,
  username: string,
  text: string,
  topicId: string,
  parentId?: string
}
