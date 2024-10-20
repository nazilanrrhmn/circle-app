import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useResetPassword } from "../hooks/use-reset-password";
import { useParams } from "react-router-dom";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const tokenData = String(token);
  const { register, handleSubmit, errors, isSubmitting, onResetPassword } =
    useResetPassword(tokenData);

  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Reset password
      </Text>
      <form onSubmit={handleSubmit(onResetPassword)}>
        <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
          <Input
            {...register("password")}
            type="password"
            placeholder="New Password*"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {/* <Input
            {...register("newPassword")}
            type="password"
            placeholder="Confirm New Password*"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {errors.newPassword && (
            <Text fontSize={13} color={"red"}>
              * {errors.newPassword.message}
            </Text>
          )} */}
          <Button
            type="submit"
            backgroundColor={"brand.green"}
            color={"white"}
            fontSize={20}
          >
            {isSubmitting ? <Spinner /> : "Create New Password"}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
