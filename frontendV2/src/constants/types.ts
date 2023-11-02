export type Credentials = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  data: UserResponse;
  message: string;
  status: number;
};

export type User = {
  id: string;
  email: string;
  role: string;
};

export type UserResponse = Omit<User, 'id'> & {
  _id: string;
};
export type LoginResponse = {
  data: UserResponse;
  message: string;
  status: number;
};
