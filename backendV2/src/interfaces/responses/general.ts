export interface GeneralResponse<T> {
  message: string;
  status: number;
  data?: T;
}
