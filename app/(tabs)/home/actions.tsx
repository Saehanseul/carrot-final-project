"use server";
import db from "@/lib/db";

export const getTweets = async () => {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      content: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true
        }
      }
    },
    orderBy: {
      created_at: "desc" // createdAt 필드를 기준으로 내림차순 정렬
    }
  });

  if (!tweets) {
    return [];
  }

  return tweets;
};
