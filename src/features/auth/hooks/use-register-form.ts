import { useState } from "react";
import { RegisterForm } from "../types";

export function useRegisterForm() {
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    fullName: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    console.log("data register", form);
  }

  return {
    handleChange,
    handleSubmit,
  };
}
