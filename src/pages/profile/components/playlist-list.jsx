import { Spinner } from "react-bootstrap";
import { useGetPlaylistsByUser } from "../../../hooks/queries/playlist";
import CardGrid from "../../../components/layout/card-grid";
import PlaylistButton from "./playlist-button";
import { useState } from "react";
import DeletePlaylist from "./delete-playlist";

const PlaylistList = ({ id, username }) => {
  const { isLoading, data } = useGetPlaylistsByUser(id);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [playlistId, setPlaylistId] = useState();

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>No playlists found.</p>;
  }

  return (
    <>
      <CardGrid columns={3}>
        {data.map((playlist) => {
          return (
            <PlaylistButton
              playlist={playlist}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              setIsDelete={setIsDelete}
              setPlaylistId={setPlaylistId}
              username={username}
            />
          );
        })}
      </CardGrid>
      {playlistId && isDelete && (
        <DeletePlaylist id={playlistId} setShow={setIsDelete} show={isDelete} />
      )}
    </>
  );
};

export default PlaylistList;
