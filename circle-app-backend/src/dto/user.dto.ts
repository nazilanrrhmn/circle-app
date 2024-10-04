export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  fullname: string;
};

export type UpdateUSerDTO = {
  id: number;
  fullname: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
};
