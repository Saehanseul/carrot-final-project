"use client";

import { logout } from "../actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button>로그아웃</button>
    </form>
  );
}
