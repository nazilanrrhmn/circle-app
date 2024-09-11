import { Tab, TabIndicator } from "@chakra-ui/react";

export function TabItem({ tabName }: { tabName: string }) {
  return (
    <Tab
      paddingY={3}
      color={"white"}
      fontWeight={500}
      fontSize={"16px"}
      lineHeight={"20px"}
    >
      {tabName}
    </Tab>
  );
}

export function TabIndicatorCircle() {
  return (
    <TabIndicator mt="-2px" height="4px" bg="brand.green" borderRadius="full" />
  );
}
