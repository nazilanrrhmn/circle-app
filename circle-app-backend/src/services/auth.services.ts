import { PrismaClient, User } from "@prisma/client";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customError } from "../types/custom.error";
import { SuccessResponse } from "../types/success.respons";
import userServices from "./user.services";
import sendEmail from "./mail.services";

const prisma = new PrismaClient();

class AuthServices {
  async register(
    data: RegisterDTO
  ): Promise<SuccessResponse<{ user: Omit<User, "password"> }>> {
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

    const { password, ...result } = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      status: "success",
      message: "User Created",
      data: {
        user: result,
      },
    };
  }

  async login(
    data: LoginDTO
  ): Promise<
    SuccessResponse<{ user?: Omit<User, "password">; accessToken: string }>
  > {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        followers: true,
        following: true,
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
      status: "success",
      message: "User logged succesfully",
      data: {
        accessToken: token,
        user: userToSign,
      },
    };
  }

  async forgotPassword(email: string) {
    try {
      const user = await userServices.getUserByMailName(email);
      console.log(user);
      if (!user) {
        throw new Error("User Not Found!");
      }

      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      console.log(token);
      await sendEmail(email, token);
      // You need to define sendEmail
    } catch (error) {
      throw new Error("Failed to send reset password email");
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
      ) as jwt.JwtPayload;

      const user = await userServices.getUserByMailName(decoded.email);
      if (!user) {
        throw new Error("User Not Found!");
      }

      // Hash password baru
      const saltRounds = 10;
      const hashedPassword: string = await bcrypt.hash(password, saltRounds); // Pastikan hashedPassword bertipe string

      // Update password user
      await userServices.updateUsers(user.id, {
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid Token!");
      }
      throw error;
    }
  }
}

export default new AuthServices();
