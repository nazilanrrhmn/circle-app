import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import OthersAccountItem from "../../../src/components/ui/others-account-item";

export default function FollowsTabs() {
  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <Tab
          w={"100%"}
          paddingY={3}
          color={"white"}
          fontWeight={500}
          fontSize={"16px"}
          lineHeight={"20px"}
          _selected={{
            position: "relative",
            _after: {
              content: '""',
              position: "absolute",
              width: "90%",
              height: "4px",
              bg: "brand.green",
              borderRadius: "full", // Rounded ends for the line
              bottom: "-1px", // Adjust line placement
              left: "5%", // Center the line under the text
            },
          }}
        >
          Followers
        </Tab>
        <Tab
          w={"100%"}
          paddingY={3}
          color={"white"}
          fontWeight={500}
          fontSize={"16px"}
          lineHeight={"20px"}
          _selected={{
            position: "relative",
            _after: {
              content: '""',
              position: "absolute",
              width: "90%",
              height: "4px",
              bg: "brand.green",
              borderRadius: "full", // Rounded ends for the line
              bottom: "-1px", // Adjust line placement
              left: "5%", // Center the line under the text
            },
          }}
        >
          Following
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Membagikan segala hal yang berhubungan dengan fotografi dan editing (Lightroom pada khususnya) | Pinned tweet adalah kumpulan thread editing 📸 | Seorang Gooner"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
          />
        </TabPanel>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
          />
          <OthersAccountItem
            image="src/assets/img/avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
