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

import { useAppSelector } from "../../../hooks/use.store";
import { useState } from "react";
import { usePostReply } from "../hooks/use-post-reply";

export default function FormReply({
  placeholder,
  buttonTitle,
  threadId,
}: {
  placeholder: string;
  buttonTitle: string;
  threadId: number;
}) {
  const { register, handleSubmit, watch, errors, isSubmitting, onSubmit } =
    usePostReply({ threadId });
  const user = useAppSelector((state) => state.auth.entities);
  const [image, setImage] = useState<string | null>(null);
  const content = watch("content");

  const onImageChage = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      onChange(event);
    }
  };

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
          <Input
            {...register("image")}
            onChange={(e) => onImageChage(e, register("image").onChange)}
            id="upload"
            type="file"
            variant={"unstyled"}
            border={"none"}
            hidden
          />
          {image && <Image src={image} rounded={8} mt={4} />}
        </Box>
        <Flex alignItems={"center"} gap={4}>
          <label htmlFor="upload">
            <Image src="/gallery-add.svg" alt="gallery" height={"24px"} />
          </label>
          <Button
            type="submit"
            backgroundColor={content ? "brand.green" : "brand.green-dark"}
            color={content ? "white" : "brand.white-dark"}
            height={"33px"}
            justifyItems={"center"}
            rounded={"full"}
            alignItems={"center"}
            padding={4}
            fontSize={"14px"}
            fontWeight={700}
            lineHeight={"17px"}
            isDisabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
