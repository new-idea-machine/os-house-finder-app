export type Credentials = {
  email: string;
  password: string;
};

export type RegisterResponse = User & {
  token: string;
};

export type User = {
  id: string;
  email: string;
  role: string;
};

export type UserResponse = Omit<User, 'id'> & {
  _id: string;
};
