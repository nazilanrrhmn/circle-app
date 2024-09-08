import { Grid, Image, AspectRatio } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function MediaList() {
  const medias = [
    "https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3828240/pexels-photo-3828240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/413959/pexels-photo-413959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3922943/pexels-photo-3922943.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <Grid
      id="media"
      templateColumns={"repeat(3, 1fr)"}
      gap={1}
      padding={"8px 4px"}
    >
      {medias.map((media) => {
        return (
          <Link to={"/detail-image"}>
            <AspectRatio width={"100%"} ratio={1}>
              <Image src={media} rounded={4} objectFit="cover" />
            </AspectRatio>
          </Link>
        );
      })}
    </Grid>
  );
}
