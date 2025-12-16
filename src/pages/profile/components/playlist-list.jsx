import { Spinner } from "react-bootstrap";
import { useGetPlaylistsByUser } from "../../../hooks/queries/playlist";
import CardGrid from "../../../components/layout/card-grid";
import PlaylistButton from "./playlist-button";
import { useState } from "react";
import DeletePlaylist from "./delete-playlist";
import CreatePlaylist from "./create-playlist";

const PlaylistList = ({ userId, username, loggedUsername }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [playlist, setPlaylist] = useState();

  const { isLoading, data } = useGetPlaylistsByUser(userId);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || !data?.length) {
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
              username={username}
              setPlaylist={setPlaylist}
              loggedUsername={loggedUsername}
            />
          );
        })}
      </CardGrid>
      {playlist && isDelete && (
        <DeletePlaylist
          id={playlist.id}
          setShow={setIsDelete}
          show={isDelete}
        />
      )}
      {playlist && isEdit && (
        <CreatePlaylist
          playlistId={playlist.id}
          description={playlist.description}
          isPublic={playlist.isPublic}
          title={playlist.title}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      )}
    </>
  );
};

export default PlaylistList;
