import { axiosPrivate } from '../../api/interceptors';
import {
  getAllComments, getAllRanks, getCommentsByTopicId, getRankById,
} from '../../constants/serverPath';
import { ICommentsRanks, ICommentsStateElement } from '../../store/comments/comments.interface';
import { IComment, IRank } from '../../types/topic.types';
import { PushCommentInReplies } from '../../utils/pushCommentReply';

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
      topicComments.comments = PushCommentInReplies(topicComments.comments, newComment);
    }

    const IRankEmpty: IRank = {
      id: newComment.id,
      dislikes: [],
      likes: [],
    };

    await axiosPrivate.post<IRank>(getAllRanks(), IRankEmpty);
    const responseComments = await axiosPrivate.put<ICommentsStateElement>(getCommentsByTopicId(topicId), topicComments);
    const responseRanks = await axiosPrivate.get<IRank[]>(getAllRanks());

    const responseData: ICommentsRanks = {
      commentsState: responseComments.data,
      ranks: responseRanks.data,
    };
    return responseData;
  },

  async deleteComment(commentId: string, topicId: string, parentId?: string) {
    const commentsResponse = await axiosPrivate.get<ICommentsStateElement>(getCommentsByTopicId(topicId));
    const topicComments = commentsResponse.data.comments;
    let newComments: ICommentsStateElement;
    if (parentId === '' || !parentId) {
      const index = topicComments.findIndex((comment) => comment.id === commentId);
      const comment = topicComments[index];
      if (comment.replies.length > 0) {
        for (let i = 0; i < comment.replies.length; i++) {
          axiosPrivate.delete(getRankById(comment.replies[i].id));
        }
        /* eslint-enable no-await-in-loop */
      }
      newComments = {
        id: topicId,
        comments: [...topicComments.slice(0, index), ...topicComments.slice(index + 1)],
      };
    } else {
      const indexOfParent = topicComments.findIndex((comment) => comment.id === parentId);
      const replies = topicComments[indexOfParent].replies;
      const indexOfReply = replies.findIndex((reply) => reply.id === commentId);
      const updReplies = [...replies.slice(0, indexOfReply), ...replies.slice(indexOfReply + 1)];
      topicComments[indexOfParent].replies = updReplies;
      newComments = {
        id: topicId,
        comments: topicComments,
      };
    }

    await axiosPrivate.delete(getRankById(commentId));

    const responseComments = await axiosPrivate.patch<ICommentsStateElement>(getCommentsByTopicId(topicId), newComments);
    const responseRanks = await axiosPrivate.get<IRank[]>(getAllRanks());
    const commentsRanks: ICommentsRanks = {
      commentsState: responseComments.data,
      ranks: responseRanks.data,
    };
    return commentsRanks;
  },

  async getAllRanks() {
    const response = await axiosPrivate.get<IRank[]>(getAllRanks());
    return response;
  },

  async rankComment(rank: IRank) {
    const response = await axiosPrivate.patch<IRank>(getRankById(rank.id), rank);
    return response;
  },
};
