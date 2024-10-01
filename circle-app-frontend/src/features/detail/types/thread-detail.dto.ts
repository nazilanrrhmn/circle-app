import { ThreadEntity } from "../../../entities/thread";

export type ThreadDetailResponseDTO = {
  status: string;
  message: string;
  data: ThreadEntity;
};
