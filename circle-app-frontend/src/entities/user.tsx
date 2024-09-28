export interface UserEntity {
  id: number;
  fullname: string;
  email: string;
  password?: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
  role: string;
}
