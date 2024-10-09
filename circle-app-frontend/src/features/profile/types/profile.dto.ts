import { UserEntity } from "../../../entities/user";

export interface UserProfileDTO {
  id: number;
  fullname: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  following: number;
  followers: number;
}

export type EditProfileRequestDTO = Pick<
  UserEntity,
  "fullname" | "username" | "bio" | "profilePhoto" | "coverPhoto"
>;

export type EditProfileResponseDTO = {
  status: string;
  message: string;
};

export type UserStoreDTO = Omit<UserEntity, "password"> & {
  followers: { id: number }[]; // assumed structure of followers
  following: { id: number }[]; // assumed structure of following
};
