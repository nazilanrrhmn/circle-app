import { Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import OthersAccountItem from "../../../components/ui/others-account-item";
import { TabIndicatorCircle, TabItem } from "../../../components/ui/circle-tab";

export default function FollowsTabs() {
  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <TabItem tabName="Followers" />
        <TabItem tabName="Following" />
      </TabList>
      <TabIndicatorCircle />
      <TabPanels>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          <OthersAccountItem
            image="./profile.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Membagikan segala hal yang berhubungan dengan fotografi dan editing (Lightroom pada khususnya) | Pinned tweet adalah kumpulan thread editing 📸 | Seorang Gooner"
            isFollow="Follow"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Follow"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Follow"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Follow"
          />
        </TabPanel>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          <OthersAccountItem
            image="./profile.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            image="./profile.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
