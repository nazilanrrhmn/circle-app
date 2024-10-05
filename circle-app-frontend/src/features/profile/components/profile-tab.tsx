import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { TabIndicatorCircle, TabItem } from "../../../components/ui/circle-tab";
import { ThreadEntity } from "../../../entities/thread";
import MediaList from "./media-list";
import PostList from "./post-list";

export default function ProfileTabs({ threads }: { threads: ThreadEntity[] }) {
  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <TabItem tabName="All Post" />
        <TabItem tabName="Media" />
      </TabList>
      <TabIndicatorCircle />
      <TabPanels>
        <TabPanel p={0}>
          <PostList threads={threads} />
        </TabPanel>
        <TabPanel p={0}>
          <MediaList threads={threads} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
