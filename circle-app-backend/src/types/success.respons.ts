export type SuccessResponse<T> = {
  status: StatusCode;
  message: string;
  data?: T;
};

export type StatusCode = "success";
