import { Box } from "@chakra-ui/react";
import RightBar from "./right-bar";
import LeftBar from "./left-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      maxWidth={"1728px"}
      margin={"auto"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <LeftBar />
      <Box width={"748px"}>{children}</Box>
      <RightBar />
    </Box>
  );
}
