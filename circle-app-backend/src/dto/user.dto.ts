export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  fullname: string;
};

export type UpdateUSerDTO = Omit<CreateUserDTO, "email">;
