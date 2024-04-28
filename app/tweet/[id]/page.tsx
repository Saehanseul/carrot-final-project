import { notFound } from "next/navigation";
import { getTweet } from "./actions";
import { Avatar } from "@/app/components/avatar";
import { formatToTimeAgo } from "@/lib/utils";
import LikeButton from "../(components)/like-button";
import db from "@/lib/db";

import { unstable_cache as nextCache } from "next/cache";
import getSession from "@/lib/session";

/**
 * next 14로 개발해서 useSWR 대신 next/cache를 사용했습니다.
 */

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60
});

async function getLikeStatus(tweetId: string, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId: tweetId,
        userId: userId!
      }
    }
  });

  const likeCount = await db.like.count({
    where: {
      tweetId
    }
  });

  return { isLiked: Boolean(isLiked), likeCount };
}

function getCachedLikeStatus(tweetId: string, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
    tags: [`like-status-${tweetId}`]
  });

  return cachedOperation(tweetId, userId);
}

export default async function TweetDetail({
  params
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const userId = session.id!;

  const tweet = await getCachedTweet(params.id);
  if (!tweet) {
    notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(params.id, userId);
  console.log("likeCount, isLiked", likeCount, isLiked);
  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 mb-6 border p-2 rounded-sm ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar avatar={tweet.user.avatar} username={tweet.user.username} />
            <span>{tweet.user.username}</span>
          </div>
          <span>{formatToTimeAgo(tweet.created_at)}</span>
        </div>
        <div className="p-4">{tweet.content}</div>
      </div>
      {
        <LikeButton
          tweetId={tweet.id}
          likeCount={likeCount}
          isLiked={isLiked}
        />
      }
    </div>
  );
}
