import Joi from "joi";
import { CreateThreadsDTO, CreateReplyDTO } from "../../dto/thread.dto";

export const CreateThreadSchema = Joi.object<CreateThreadsDTO>({
  content: Joi.string(),
  image: Joi.string().optional().allow(null),
  authorId: Joi.number(),
});

export const CreateReplySchema = Joi.object<CreateReplyDTO>({
  content: Joi.string().required(),
  image: Joi.string().optional().allow(null),
  authorId: Joi.number().required(),
  threadId: Joi.number().required(),
});
