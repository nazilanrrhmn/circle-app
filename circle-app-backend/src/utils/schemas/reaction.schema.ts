import Joi from "joi";
import { CreateReplyDTO } from "../../dto/reaction.dto";

export const CreateReplySchema = Joi.object<CreateReplyDTO>({
  content: Joi.string(),
  image: Joi.string(),
  authorId: Joi.number(),
});
