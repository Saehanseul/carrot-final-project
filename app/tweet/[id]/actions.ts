"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export const getTweet = async (id: string) => {
  return db.tweet.findUnique({
    where: {
      id: id
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatar: true
        }
      }
    }
  });
};

export const likeTweet = async (tweetId: string) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!
      }
    });
  } catch (e) {}
};

export const dislikeTweet = async (tweetId: string) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!
        }
      }
    });
  } catch (e) {}
};
