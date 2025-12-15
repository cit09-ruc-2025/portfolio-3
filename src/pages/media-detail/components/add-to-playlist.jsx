import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { queryClient } from "../../../context/query-client-provider";
import { useGetPlaylistsByUser } from "../../../hooks/queries/playlist";
import PlaylistItem from "./playlist-item";

function AddToPlaylist({ userId, mediaId, playLists }) {
  const [showModal, setShowModal] = useState(false);
  const { data: playlists } = useGetPlaylistsByUser(userId);

  const handleClose = () => {
    setShowModal(false);
    queryClient.invalidateQueries(["media", mediaId]);
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
          <ListGroup variant="flush">
            {playlists?.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                mediaId={mediaId}
                isInPlaylist={playLists?.includes(playlist.id)}
              />
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddToPlaylist;
