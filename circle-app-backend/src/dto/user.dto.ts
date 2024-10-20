export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  fullname: string;
};

export type UpdateUserDTO = {
  id: number;
  fullname: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
  coverPhoto?: string;
};
