import Link from "next/link";
import { SWRProvider } from "../swr-provider";

export default function Intro() {
  return (
    <SWRProvider>
      <div className="flex flex-col items-center min-h-screen justify-between p-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-blue-400 text-4xl">트위터</h1>
          <h2 className="text-2xl">트위터에 오신걸 환영합니다!</h2>
        </div>

        <div className="flex flex-col w-full items-center gap-3">
          <Link href="/create-account">시작하기</Link>
          <div className="flex gap-2">
            <span>이미 계정이 있나요?</span>
            <Link href="/login" className=" hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </SWRProvider>
  );
}
