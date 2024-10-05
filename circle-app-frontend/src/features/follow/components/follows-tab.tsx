import { Tabs, TabList, TabPanels, TabPanel, Spinner } from "@chakra-ui/react";
import OthersAccountItem from "../../../components/ui/others-account-item";
import { TabIndicatorCircle, TabItem } from "../../../components/ui/circle-tab";
import { apiV1 } from "../../../libs/api";
import { useEffect, useState } from "react";
import { FollowEntitiy } from "../../../entities/follow";

export default function FollowsTabs() {
  const [following, setFollowing] = useState<FollowEntitiy[]>();
  const [followers, setFollowers] = useState<FollowEntitiy[]>();

  async function getFollowList() {
    const response = await apiV1.get("/follows");
    const data = response.data.data;
    return { following: data.following, followers: data.followers };
  }

  useEffect(() => {
    getFollowList().then(({ following, followers }) => {
      setFollowing(following), setFollowers(followers);
    });
  }, []);

  if (!following || !followers) {
    return <Spinner />;
  }

  return (
    <Tabs isFitted variant={"unstyled"}>
      <TabList borderBottom="1px solid" borderColor="brand.borderAbu">
        <TabItem tabName="Followers" />
        <TabItem tabName="Following" />
      </TabList>
      <TabIndicatorCircle />
      <TabPanels>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          {followers.map((follower) => {
            return (
              <OthersAccountItem
                id={follower.followers.id}
                key={follower.id}
                image={follower.followers.profilePhoto}
                fullName={follower.followers.fullname}
                userName={follower.followers.username}
                bio={follower.followers.bio}
                isFollow={follower.isFollow}
              />
            );
          })}
        </TabPanel>
        <TabPanel display={"flex"} flexDirection={"column"} gap={4}>
          {following.map((following) => {
            return (
              <OthersAccountItem
                id={following.following.id}
                key={following.id}
                image={following.following.profilePhoto}
                fullName={following.following.fullname}
                userName={following.following.username}
                bio={following.following.bio}
                isFollow={following.isFollow}
              />
            );
          })}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
