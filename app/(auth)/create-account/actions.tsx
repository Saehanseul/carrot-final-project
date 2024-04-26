"use server";
import { createAccountSchema } from "./schema";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import login from "@/lib/login";

export const createAccount = async (formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  };

  const result = createAccountSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      }
    });

    return login(user.id);
  }
};
