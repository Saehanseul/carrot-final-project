import { z } from "zod";

export const createAccountSchema = z.object({
  username: z.string({
    required_error: "닉네임을 입력하세요"
  }),
  email: z.string().email(),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다" }),
  confirmPassword: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
