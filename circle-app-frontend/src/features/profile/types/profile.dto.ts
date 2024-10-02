export interface UserProfileDTO {
  id: number;
  fullname: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
  following: number;
  followers: number;
}
