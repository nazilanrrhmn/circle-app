import Joi from "joi";
import { CreateUserDTO } from "../../dto/user.dto";

export const createUserSchema = Joi.object<CreateUserDTO>({
  email: Joi.string().email().required(),
  fullname: Joi.string(),
  password: Joi.string().min(6),
  username: Joi.string().required(),
});
