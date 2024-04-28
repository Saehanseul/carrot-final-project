"use client";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: string;
}

import { HandThumbUpIcon as HandThumbUpIconOutLine } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { dislikeTweet, likeTweet } from "../[id]/actions";
import { useOptimistic, useState } from "react";

export default function LikeButton({
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
  tweetId
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  // const handleOnClick = async () => {
  //   reducerFn(undefined);
  //   console.log("isLiked", isLiked);
  //   if (isLiked) {
  //     await dislikeTweet(tweetId);
  //   } else {
  //     await likeTweet(tweetId);
  //   }
  // };
  const handleOnClick = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(newIsLiked ? likeCount + 1 : likeCount - 1);

    try {
      if (newIsLiked) {
        await likeTweet(tweetId);
      } else {
        await dislikeTweet(tweetId);
      }
    } catch (error) {
      // If there's an error, revert the optimistic UI update
      setIsLiked(isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      console.error("Error updating like status:", error);
    }
  };

  return (
    <button onClick={handleOnClick} className="flex gap-2 items-center">
      {isLiked ? (
        <HandThumbUpIconOutLine className="size-5" />
      ) : (
        <HandThumbUpIconSolid className="size-5" />
      )}
      {isLiked ? <span>({likeCount})</span> : <span>좋아요 ({likeCount})</span>}
    </button>
  );
}
