import { PrismaClient, User } from "@prisma/client";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customError } from "../types/custom.error";

const prisma = new PrismaClient();

class AuthServices {
  async register(data: RegisterDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (data.email == user?.email) {
      throw {
        status: "fail",
        message: "Email already use",
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "Incorrect Email / Password",
      } as customError;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw {
        code: "USER_NOT_EXIST",
        status: 404,
        message: "Incorrect Email / Password",
      } as customError;
    }

    const { password, ...userToSign } = user;

    const secretKey = process.env.JWT_SECRET_KEY as string;

    const token = jwt.sign(userToSign, secretKey);

    return {
      token: token,
      data: userToSign,
    };
  }
}

export default new AuthServices();
