import { z } from "zod";

export const addTweetSchema = z.object({
  content: z.string({
    required_error: "내용을 입력하세요"
  })
});

export type TweetType = z.infer<typeof addTweetSchema>;
