import { Box } from "@chakra-ui/react";
import LeftBar from "../../../components/layouts/left-bar";
import { RightBarProfile } from "../../../components/layouts/right-bar";
import MyProfilePage from "../../../features/profile/components/my-profile-page";

export default function MyProfile() {
  return (
    <Box
      maxWidth={"1728px"}
      margin={"auto"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <LeftBar />
      <Box
        width={"748px"}
        borderX={"solid 1px"}
        borderColor={"brand.borderAbu"}
      >
        <MyProfilePage />
      </Box>
      <RightBarProfile />
    </Box>
  );
}
