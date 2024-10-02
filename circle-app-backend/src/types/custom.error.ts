export type customError = {
  status: number;
  message: string;
  code: CustomErrorCode;
};

export type CustomErrorCode =
  | "USER_NOT_EXIST"
  | "THREAD_NOT_EXIST"
  | "REPLY_NOT_EXIST";
