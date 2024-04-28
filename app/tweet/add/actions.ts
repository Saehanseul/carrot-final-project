"use server";

import getSession from "@/lib/session";
import { addTweetSchema } from "./schema";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function postTweet(formData: FormData) {
  const data = {
    content: formData.get("content")
  };

  const result = await addTweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          content: result.data.content,
          user: {
            connect: {
              id: session.id
            }
          }
        },
        select: {
          id: true
        }
      });

      if (tweet) {
        redirect(`/tweet/${tweet.id}`);
      }
    }
  }
}
