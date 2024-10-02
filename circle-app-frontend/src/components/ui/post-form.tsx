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
import { usePostThread } from "../../features/home/hooks/use-post-form";
import { useAppSelector } from "../../hooks/use.store";

export default function FormPost({
  placeholder,
  buttonTitle,
}: {
  placeholder: string;
  buttonTitle: string;
}) {
  const { register, handleSubmit, errors, isSubmitting, onSubmit, watch } =
    usePostThread();
  const user = useAppSelector((state) => state.auth.entities);
  const content = watch("content");

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
          {/* Custom upload button */}
          <label htmlFor="upload-image">
            <Button
              variant="outline"
              size="sm"
              cursor="pointer"
              leftIcon={
                <Image
                  src="/icons/gallery-add.svg"
                  alt="gallery"
                  height="24px"
                />
              }
              as="span"
            />
            <Input
              type="file"
              accept="image/*"
              {...register("image")}
              id="upload-image"
              style={{ display: "none" }}
            />
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
            disabled={isSubmitting || !content}
          >
            {isSubmitting ? <Spinner /> : `${buttonTitle}`}
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
