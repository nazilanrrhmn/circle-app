import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  FormControl,
  Spinner,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { usePostReply } from "../hooks/use-post-reply";
import { useAppSelector } from "../../../hooks/use.store";

export default function FormReply({
  placeholder,
  buttonTitle,
  threadId,
}: {
  placeholder: string;
  buttonTitle: string;
  threadId: number;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePostReply({ threadId });
  const user = useAppSelector((state) => state.auth.entities);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        display={"flex"}
        alignItems={"center"}
        gap={4}
        justifyContent={"space-between"}
        borderBottom={"solid 1px"}
        borderColor={"brand.borderAbu"}
        p={4}
      >
        <Avatar
          src={user.profilePhoto}
          name={user.fullname}
          borderColor={"brand.backgroundBox"}
          height={"40px"}
          width={"40px"}
          rounded={"full"}
          objectFit="cover"
        />
        <Box flex={"1"}>
          <Input
            {...register("content")}
            variant={"unstyled"}
            border={"none"}
            placeholder={placeholder}
          />
          {errors.content && (
            <Text fontSize={13} color={"red"}>
              * {errors.content.message}
            </Text>
          )}
        </Box>
        <Flex alignItems={"center"} gap={4}>
          <Image src="/gallery-add.svg" alt="gallery" height={"24px"} />
          <Button
            type="submit"
            backgroundColor={"brand.green-dark"}
            color={"brand.white-dark"}
            height={"33px"}
            justifyItems={"center"}
            rounded={"full"}
            alignItems={"center"}
            padding={4}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
          >
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
