import { Box } from "@chakra-ui/react";
import LeftBar from "./left-bar";
import RightBar from "./right-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
        {children}
      </Box>
      <RightBar />
    </Box>
  );
}
