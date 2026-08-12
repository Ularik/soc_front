import axiosApi from "@/axiosApi";
import type { IUser, UserLoginMutation, LoginResponse } from "@/types/user";

export const getMe = async () => {
  const res = await axiosApi.get<IUser>("/users/me");

  return res.data;
};

export const login = async (data: UserLoginMutation): Promise<LoginResponse> => {
  const res = await axiosApi.post<LoginResponse>("/users/login", data);

  return res.data;
};

export const logout = async () => {
  const res = await axiosApi.post("/users/logout");

  return res.data;
};
