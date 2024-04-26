import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISession {
  id?: number;
}
export default function getSession() {
  return getIronSession<ISession>(cookies(), {
    cookieName: "session-twitter",
    password:
      "alksjdlkfjdsfjsl23j4jw902fuwhoeifihweoifhywasdffsdfw3sfdsdf30jfe0jdlkfjslf2234" // 노마드 테스트용 임시
  });
}
