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
            id={1} // Add a unique id
            image="./avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Membagikan segala hal yang berhubungan dengan fotografi dan editing (Lightroom pada khususnya) | Pinned tweet adalah kumpulan thread editing 📸 | Seorang Gooner"
            isFollow="Follow"
          />
          <OthersAccountItem
            id={2} // Add a unique id
            image="./avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Follow"
          />
          <OthersAccountItem
            id={3} // Add a unique id
            image="./avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            id={4} // Add a unique id
            image="./avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Follow"
          />
          <OthersAccountItem
            id={5} // Add a unique id
            image="./avatar.png"
            fullName="Elon Musk"
            userName="@elonnnn"
            bio="Post about Product Design • My Experience"
            isFollow="Follow"
          />
        </TabPanel>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          <OthersAccountItem
            id={6} // Add a unique id
            image="./avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            id={7} // Add a unique id
            image="./avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            id={8} // Add a unique id
            image="./avatar.png"
            fullName="Najwa Shihab"
            userName="@najwa"
            bio="Post about Product Design • My Experience"
            isFollow="Following"
          />
          <OthersAccountItem
            id={9} // Add a unique id
            image="./avatar.png"
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
