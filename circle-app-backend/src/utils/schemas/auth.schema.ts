import Joi from "joi";
import { LoginDTO, RegisterDTO } from "../../dto/auth.dto";

export const RegisterSchema = Joi.object<RegisterDTO>({
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().min(6),
});

export const LoginSchema = Joi.object<LoginDTO>({
  email: Joi.string().email(),
  password: Joi.string(),
});
