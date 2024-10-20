export type RegisterDTO = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export interface updateUserDTO {
  // username?: string;
  email?: string;
  password?: string;
}

// export interface ForgotPasswordDto {
//   email: string;
// }

// export interface ResetPasswordDto {
//   token: string;
//   password: string;
// }
