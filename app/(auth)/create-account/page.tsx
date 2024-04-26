"use client";

import { useForm } from "react-hook-form";
import Input from "../../components/input";
import Button from "../../components/button";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const errors = await createAccount(formData);

    if (errors) {
    }
  });

  const onValid = async () => {
    await onSubmit();
  };
  return (
    <div>
      <form action={onValid}>
        <Input
          {...register("username")}
          required
          type="text"
          placeholder="닉네임"
          errors={[errors.username?.message ?? ""]}
        />
        <Input
          {...register("email")}
          required
          type="email"
          placeholder="이메일"
          errors={[errors.email?.message ?? ""]}
        />
        <Input
          {...register("password")}
          required
          type="password"
          placeholder="비밀번호"
          errors={[errors.password?.message ?? ""]}
        />
        <Input
          {...register("confirmPassword")}
          required
          type="password"
          placeholder="비밀번호 확인"
          errors={[errors.confirmPassword?.message ?? ""]}
        />
        <Button text="회원가입" />
      </form>
    </div>
  );
}
