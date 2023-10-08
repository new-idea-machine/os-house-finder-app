export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  role: string;
};

export type UserResponse = {
  _id: string;
  email: string;
  role: string;
};
