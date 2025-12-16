import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { queryClient } from "../../../context/query-client-provider";
import { useGetPlaylistsByUser } from "../../../hooks/queries/playlist";
import PlaylistItem from "./playlist-item";
import { getCookie } from "../../../libs/utils/cookie";
import Spinner from "../../../components/layout/spinner";

function AddToPlaylist({ itemId, playListIds, isMedia }) {
  const [showModal, setShowModal] = useState(false);

  const userId = getCookie("userId");
  const { data: playlists, isLoading } = useGetPlaylistsByUser(userId);

  const handleClose = () => {
    setShowModal(false);
    if (isMedia) {
      queryClient.invalidateQueries(["media-user-status", itemId]);
    } else {
      queryClient.invalidateQueries(["people-user-status", itemId]);
    }
  };

  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button type="button" className="primary-button" onClick={handleShow}>
        Add to Playlist
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add to...</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-0 overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          {isLoading && <Spinner />}
          {playlists?.length === 0 && <p className="p-2">No playlists yet!</p>}
          <ListGroup variant="flush">
            {playlists?.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                itemId={itemId}
                isInPlaylist={playListIds?.includes(playlist.id)}
                isMedia={isMedia}
              />
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddToPlaylist;
