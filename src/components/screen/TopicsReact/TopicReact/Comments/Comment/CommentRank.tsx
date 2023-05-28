import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Comment.module.scss';
import { idType, IRank } from '../../../../../../types/topic.types';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import { useActions } from '../../../../../../hooks/useActions';
import { MyToast } from '../../../../../ui/MyToast/MyToast';

interface ICommentRank {
  id: string,
  userId: string | undefined
}

const CommentRank = ({ id, userId }: ICommentRank) => {
  const likeUrl = require('../../../../../../assets/img/like-icon.png');
  const dislikeUrl = require('../../../../../../assets/img/dislike-icon.png');
  const likeUrlActive = require('../../../../../../assets/img/like-icon-white.png');
  const dislikeUrlActive = require('../../../../../../assets/img/dislike-icon-white.png');

  const emptyRank: IRank = {
    id,
    likes: [],
    dislikes: [],
  };

  const { rankComment } = useActions();

  const ranks = useTypedSelector((state) => state.comments.ranks);
  const isLoading = useTypedSelector((state) => state.comments.isRankLoading);

  const [rank, setRank] = useState<IRank>(emptyRank);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likesLen, setLikesLen] = useState(0);
  const [dislikesLen, setDislikesLen] = useState(0);

  useEffect(() => {
    const newRank = ranks.find((rankInArray) => rankInArray.id === id);
    setIsLiked(!!newRank?.likes.find((like) => like?.id === userId));
    setIsDisliked(!!newRank?.dislikes.find((dislike) => dislike?.id === userId));
    setLikesLen(newRank?.likes.length ?? 0);
    setDislikesLen(newRank?.dislikes.length ?? 0);
    setRank(newRank ?? emptyRank);
  }, [ranks]);

  const handleRank = (isSet: boolean, isLike: boolean) => {
    let likes: idType[] = [];
    let dislikes: idType[] = [];

    if (!userId) {
      MyToast('Авторизуйтесь, чтобы оценивать комментарии', false);
      return;
    }
    const newIdElement: idType = {
      id: userId,
    };
    if (isLike) {
      if (isSet) {
        likes = [...rank.likes, newIdElement];
        const index = rank.dislikes.findIndex((dislike) => dislike.id === userId);
        if (index !== -1) {
          dislikes = [...rank.dislikes.slice(0, index), ...rank.dislikes.slice(index + 1)];
        } else {
          dislikes = rank.dislikes;
        }
      } else {
        const index = rank.likes.findIndex((like) => like.id === userId);
        if (index !== -1) {
          likes = [...rank.likes.slice(0, index), ...rank.likes.slice(index + 1)];
        } else {
          likes = rank.likes;
        }
        dislikes = rank.dislikes;
      }
    } else if (isSet) {
      dislikes = [...rank.dislikes, newIdElement];
      const index = rank.likes.findIndex((like) => like.id === userId);
      if (index !== -1) {
        likes = [...rank.likes.slice(0, index), ...rank.likes.slice(index + 1)];
      } else {
        likes = rank.likes;
      }
    } else {
      const index = rank.dislikes.findIndex((dislike) => dislike.id === userId);
      if (index !== -1) {
        dislikes = [...rank.dislikes.slice(0, index), ...rank.dislikes.slice(index + 1)];
      } else {
        dislikes = rank.dislikes;
      }
      likes = rank.likes;
    }
    setRank({
      id,
      likes,
      dislikes,
    });
    rankComment({
      id,
      likes,
      dislikes,
    });
  };

  return (
    <>
      <button
        disabled={isLoading}
        className={cn(styles.commentRankButton, {
          [styles.commentRankButtonDisabled]: isLoading,
        })}
        onClick={() => handleRank(!isLiked, true)}
      >
        <img src={isLiked ? likeUrlActive : likeUrl} alt="like-icon" />
      </button>
      <span>{likesLen}</span>
      <button
        disabled={isLoading}
        className={cn(styles.commentRankButton, {
          [styles.commentRankButtonDisabled]: isLoading,
        })}
        onClick={() => handleRank(!isDisliked, false)}
      >
        <img src={isDisliked ? dislikeUrlActive : dislikeUrl} alt="dislike-icon" />
      </button>
      <span>{dislikesLen}</span>
    </>
  );
};

export default React.memo(CommentRank);
