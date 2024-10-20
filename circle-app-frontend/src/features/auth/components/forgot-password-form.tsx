import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../hooks/use-forgot-password";

export default function ForgotPasswordForm() {
  const { register, errors, handleSubmit, isSubmitting, onSendEmail, serverMessage } =
    useForgotPassword(); // Add serverMessage to display backend response

  return (
    <Box color={"white"} width={"brand.form"}>
      <Image src="/logo.svg" alt="Circle Logo" />
      <Text as={"h1"} fontSize={28} fontWeight={700} marginY={5}>
        Forgot password
      </Text>
      <form onSubmit={handleSubmit(onSendEmail)}>
        <FormControl display={"flex"} flexDirection={"column"} gap={"12px"}>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email*"
            rounded={8}
            padding={5}
            fontSize={14}
            fontWeight={500}
            borderColor={"brand.borderAbu"}
          />
          {errors.email && (
            <Text fontSize={13} color={"red"}>
              * {errors.email.message}
            </Text>
          )}
          <Button
            type="submit"
            backgroundColor={"brand.green"}
            color={"white"}
            fontSize={20}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Send Instruction"}
          </Button>
          {/* Display backend response */}
          {serverMessage && (
            <Text fontSize={13} color={"green"} marginTop={3}>
              {serverMessage}
            </Text>
          )}
        </FormControl>
      </form>
      <Text fontSize={14} marginTop={4}>
        Already have account?{" "}
        <Text as={"span"} color={"brand.green"}>
          {" "}
          <Link to="/login"> Login</Link>
        </Text>
      </Text>
    </Box>
  );
}
