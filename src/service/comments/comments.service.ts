import { axiosPrivate } from '../../api/interceptors';
import { getAllComments, getAllTopics, getCommentsByTopicId } from '../../constants/serverPath';
import { ICommentsStateElement } from '../../store/comments/comments.interface';
import { IComment } from '../../types/topic.types';

export const commentsService = {

  async getAllComments() {
    const response = await axiosPrivate.get<ICommentsStateElement[]>(getAllComments());
    return response;
  },

  async getCommentsById(topicId: string) {
    const response = await axiosPrivate.get<ICommentsStateElement>(getCommentsByTopicId(topicId));
    return response;
  },

  async addComment(newComment: IComment, topicId: string) {
    const commentsResponse = await axiosPrivate.get<ICommentsStateElement>(getCommentsByTopicId(topicId));
    const topicComments = commentsResponse.data;
    if (!newComment.parentId) {
      topicComments.comments.push(newComment);
    } else {
      topicComments.comments.forEach((comment) => {
        if (comment.id === newComment.parentId) {
          comment.replies.push(newComment);
        }
      });
    }

    const response = await axiosPrivate.put<ICommentsStateElement>(getCommentsByTopicId(topicId), topicComments);
    return response.data;
  },
};
