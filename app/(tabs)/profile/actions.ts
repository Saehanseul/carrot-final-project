"use server";

import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";

export const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = db.user.findUnique({
      where: { id: session.id }
    });

    if (user) {
      return user;
    }
  }
  notFound();
};

export const logout = async () => {
  const session = await getSession();
  await session.destroy();
  return redirect("/");
};
