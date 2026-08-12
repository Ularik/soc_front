export type UserRole = "ADMIN" | "MANAGER" | "CLIENT";

export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface UserMutation {
  id: string;
  email: string;
  password: string;
}

export interface UserUpdateMutation {
  email: string;
  status: string;
}


export interface UserLoginMutation {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: IUser;
}
