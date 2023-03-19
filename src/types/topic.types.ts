export interface ITopic {
  id: string;
  titleTopic: string;
  pictureTopicUrl: string;
  videoUrl: string;
  relatedQuestionsId: string;
  passedTopic: boolean;
  descriptionTopic: string;
  numberTopic: number;
  commentsId: string;
}

export interface IComment {
  userId: string,
  id: string,
  pubDate: string,
  username: string,
  commentText: string,
  replies: IComment[],
  parentId?: string;
}
