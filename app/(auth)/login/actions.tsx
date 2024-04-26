"use server";

import login from "@/lib/login";
import { LoginFormSchema } from "./schema";
import bcrypt from "bcrypt";

export const loginAction = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  };

  const result = await LoginFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db?.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    });
    console.log("user", user);
    const isPasswordCorrect = await bcrypt.compare(
      result.data.password,
      user!.password ?? ""
    );
    console.log("isPasswordCorrect", isPasswordCorrect);
    if (isPasswordCorrect) {
      return login(user!.id);
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 일치하지 않습니다."],
          email: []
        }
      };
    }
  }
};
