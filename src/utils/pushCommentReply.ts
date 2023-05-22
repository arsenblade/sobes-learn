import { IComment } from '../types/topic.types';

export const PushCommentInReplies = (comments: IComment[], newComment: IComment) => {
  comments.map((comment) => {
    if (comment.replies.length > 0) comment.replies = PushCommentInReplies(comment.replies, newComment);
    if (comment.id === newComment.parentId) comment.replies.push(newComment);
    return comment;
  });
  return comments;
};
