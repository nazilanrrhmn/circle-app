export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  fullname: string;
};

export type UpdateUSerDTO = {
  fullname: string;
  username: string;
  bio: string;
  profilePhoto: string;
};
