import { IComment } from '../../types/topic.types';

export interface ICommentsState {
  currentTopicComments: ICommentsStateElement,
  isLoading: boolean,
  currentFormId: string,
  error: string
}

export interface ICommentsStateElement {
  id: string,
  comments: IComment[]
}
