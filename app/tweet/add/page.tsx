"use client";

import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import { postTweet } from "./actions";

export default function AddTweet() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    await postTweet(formData);
  });

  const onValid = async () => {
    await onSubmit();
  };
  return (
    <div>
      <form
        action={onValid}
        className="p-6 flex flex-col justify-between h-screen"
      >
        <textarea
          {...register("content")}
          placeholder="오늘 남길 트윗은..."
          className="resize-none h-full mb-6 p-2 border rounded text-black"
        ></textarea>
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
