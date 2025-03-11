// "use client";
import { instance } from "@/lib/apiInstance";
import { toast } from "@/hooks/use-toast";
import { apiHandler } from "@/lib/api";
interface FormData {
  email: string;
  password: string;
}

export const signup = async (formdata: FormData) => {
  const data = await apiHandler({
    method: "POST",
    url: "/api/users/signup",
    data: {
      email: formdata.email,
      password: formdata.password,
    },
    successMessage: "Account created successfully!",
  });
  return data;
};

export const signin = async (formdata: FormData) => {
  const response = await instance.post("/api/users/signin", {
    email: formdata.email,
    password: formdata.password,
  });
  return response.data;
};

export const signout = async () => {
  await instance.get("/api/users/signout");
};

export const fetchUser = async () => {
  const response = await instance.get("/api/users/me");
  return response.data;
};
