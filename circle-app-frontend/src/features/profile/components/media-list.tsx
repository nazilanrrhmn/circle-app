import { AspectRatio, Grid, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ThreadEntity } from "../../../entities/thread";

export default function MediaList({ threads }: { threads: ThreadEntity[] }) {
  // const [medias, setMedia] = useState<ThreadEntity[]>([]);
  // const user = useAppSelector((state) => state.auth.entities);

  // async function getUserThread() {
  //   const response = await apiV1.get<null, { data: ThreadResponseDTO }>(`/user/threads/${user.id}`);
  //   const data = response.data.data;
  //   return { data: data };
  // }

  // useEffect(() => {
  //   getUserThread().then(({ data }) => {
  //     setMedia(data);
  //   });
  // }, []);

  return (
    <Grid
      id="media"
      templateColumns={"repeat(3, 1fr)"}
      gap={1}
      padding={"8px 4px"}
    >
      {threads.map((thread) => {
        if (thread.image !== null) {
          return (
            <Link key={thread.id} to={`/detail-image/${thread.id}`}>
              <AspectRatio width={"100%"} ratio={1}>
                <Image src={thread.image} rounded={4} objectFit="cover" />
              </AspectRatio>
            </Link>
          );
        }
      })}
    </Grid>
  );
}

// const medias = [
//   "https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/3828240/pexels-photo-3828240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/413959/pexels-photo-413959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/3922943/pexels-photo-3922943.jpeg?auto=compress&cs=tinysrgb&w=600",
// ];
