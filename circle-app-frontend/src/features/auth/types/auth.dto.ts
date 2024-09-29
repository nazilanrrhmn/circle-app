import { UserEntity } from "../../../entities/user";

export type LoginRequestDTO = Pick<UserEntity, "email" | "password">;

export type LoginResponseDTO = {
  status: string;
  message: string;
  data: {
    accessToken: string;
    user: UserStoreDTO;
  };
};

export type RegisterRequestDTO = Pick<
  UserEntity,
  "fullname" | "email" | "password"
>;

export type RegisterResponseDTO = LoginResponseDTO;

export type UserStoreDTO = Omit<UserEntity, "password">;
