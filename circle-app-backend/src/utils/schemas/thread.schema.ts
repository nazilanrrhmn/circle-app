import Joi from "joi";
import { CreateThreadsDTO } from "../../dto/thread.dto";

export const CreateThreadSchema = Joi.object<CreateThreadsDTO>({
  content: Joi.string(),
  image: Joi.string().optional().allow(null),
  authorId: Joi.number(),
});
