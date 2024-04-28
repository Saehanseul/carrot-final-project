import Image from "next/image";

export const Avatar = ({
  avatar,
  username
}: {
  avatar: string | null;
  username: string;
}) => {
  return avatar ? (
    <Image
      src={avatar}
      alt={username}
      width={50}
      height={50}
      className="size-8 rounded-full"
    />
  ) : (
    <div className="size-8 rounded-full bg-gray-400" />
  );
};
