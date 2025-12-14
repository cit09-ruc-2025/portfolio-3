import { Spinner } from "react-bootstrap";
import { useGetPlaylists } from "../../../hooks/queries/playlist";
import CardGrid from "./card-grid";
import PlaylistButton from "./playlist-button";

const PlaylistList = ({ id }) => {
  const { isLoading, data } = useGetPlaylists(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>No playlists found.</p>;
  }

  return (
    <CardGrid columns={3}>
      {data.map((playlist) => {
        return <PlaylistButton playlist={playlist} />;
      })}
    </CardGrid>
  );
};

export default PlaylistList;
