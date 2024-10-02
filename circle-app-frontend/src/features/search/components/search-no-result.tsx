import { Box, Text } from "@chakra-ui/react";

export default function SearchNoResults({ keyword }: { keyword: string }) {
  return (
    <Box m={"auto"} textAlign={"center"} w={"348px"} padding={4}>
      <Text fontSize={"20px"} fontWeight={700} lineHeight={"28px"}>
        No result for "{keyword}"
      </Text>
      <Text
        fontSize={"14px"}
        fontWeight={400}
        lineHeight={"20px"}
        color={"brand.fontSecondary"}
      >
        Try searching for something else or check the spelling of what you
        typed.
      </Text>
    </Box>
  );
}
