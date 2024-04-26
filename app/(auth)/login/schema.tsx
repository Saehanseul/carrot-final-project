import { z } from "zod";
import db from "@/lib/db";

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    }
  });
  return !!user;
};

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExist, "해당 이멩리로 가입된 계정이 없습니다."),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
});
