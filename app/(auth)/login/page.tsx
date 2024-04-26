"use client";
import Input from "@/app/components/input";
import { useForm } from "react-hook-form";
import { loginAction } from "./actions";
import Button from "@/app/components/button";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onsubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const errors = await loginAction(formData);

    if (errors) {
    }
  });

  const onValid = async () => {
    await onsubmit();
  };

  return (
    <div>
      <form action={onValid}>
        <Input
          {...register("email")}
          required
          type="email"
          placeholder="이메일"
          errors={[errors.username?.message ?? ""]}
        />
        <Input
          {...register("password")}
          required
          type="password"
          placeholder="비밀번호"
          errors={[errors.password?.message ?? ""]}
        />
        <Button text="로그인" />
      </form>
    </div>
  );
}
