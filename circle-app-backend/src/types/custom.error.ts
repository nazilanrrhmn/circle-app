export type customError = {
  status: number;
  message: string;
  code: CustemErrorCode;
};

export type CustemErrorCode = "USER_NOT_EXIST";
