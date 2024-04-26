import Link from "next/link";

export default function TabBar() {
  return (
    <div className="fixed bottom-0 w-full max-w-screen-md max-auto grid grid-cols-2 border-neutral-600 border-t px-5 py-3 *:flex *:flex-col  *:text-white bg-neutral-800">
      <Link href="/home" className=" flex justify-center">
        <span>홈</span>
      </Link>
      <Link href="/profile" className=" flex justify-center">
        <span>프로필</span>
      </Link>
    </div>
  );
}
