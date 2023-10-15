export interface GeneralResponse<T> {
  message: string;
  status: number;
  data?: T;
}

export interface RegisterUserResponse {
  token?: string;
}
