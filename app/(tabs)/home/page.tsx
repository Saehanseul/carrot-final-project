import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getTweets } from "./actions";
import { Avatar } from "@/app/components/avatar";
import { formatToTimeAgo } from "@/lib/utils";

export default async function Home() {
  const tweets = await getTweets();
  console.log("tweets", tweets);
  return (
    <div className="max-w-screen-sm w-screen h-screen relative p-6">
      {tweets.map((tweet) => {
        return (
          <div className="flex flex-col gap-2 mb-6 border p-2 rounded-sm ">
            <Link href={`tweet/${tweet.id}`} className="text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    avatar={tweet.user.avatar}
                    username={tweet.user.username}
                  />
                  <span>{tweet.user.username}</span>
                </div>
                <span>{formatToTimeAgo(tweet.created_at)}</span>
              </div>
              <div className="p-4">{tweet.content}</div>
            </Link>
          </div>
        );
      })}
      <Link
        href="/tweet/add"
        className="bg-blue-400 text-white
        flex items-center justify-center rounded-full transition-colors hover:bg-blue-500 size-16  absolute bottom-24 right-8"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
