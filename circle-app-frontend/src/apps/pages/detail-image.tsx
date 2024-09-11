import { Flex, Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiXCircle } from "react-icons/hi";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import PostDetail from "../../features/detail/components/post-detail";
import FormPost from "../../components/ui/post-form";
import RepliesList from "../../features/detail/components/replies-list";
import { useState } from "react";

export default function DetailImage() {
  const navigate = useNavigate();
  const [isContentOpen, setIsContentOpen] = useState(true);

  const fullImage = () => {
    setIsContentOpen(false);
  };

  const openContent = () => {
    setIsContentOpen(true);
  };

  return (
    <Flex justifyContent={"space-between"} p={2}>
      <Box flex={"1"} position={"sticky"} top={0} px={2} height={"100vh"}>
        <Box position={"absolute"} top={4} left={2}>
          <HiXCircle
            size={34}
            onClick={() => navigate(-1)}
            cursor={"pointer"}
          />
        </Box>
        <Box
          onClick={isContentOpen ? fullImage : openContent}
          cursor={"pointer"}
          rounded={"full"}
          border={"solid 2px"}
          borderColor={"white"}
          position={"absolute"}
          top={4}
          right={2}
        >
          {isContentOpen ? (
            <HiChevronRight size={24} />
          ) : (
            <HiChevronLeft size={24} />
          )}
        </Box>

        <Image
          src="https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height={"100%"}
          width={"100%"}
          rounded={4}
          objectFit="contain"
        />
      </Box>
      {isContentOpen && (
        <Box
          width={"30%"}
          id="imageCard"
          borderLeft={"solid 1px"}
          borderColor={"brand.borderAbu"}
        >
          <PostDetail
            image="src/assets/img/avatar.png"
            fullName="Leo Messi"
            userName="@leomessi"
          />
          <FormPost placeholder="Type your reply!" buttonTitle="Reply" />
          <RepliesList />
        </Box>
      )}
    </Flex>
  );
}
