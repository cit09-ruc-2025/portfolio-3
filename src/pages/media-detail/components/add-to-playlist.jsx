import { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import {
  useGetPlaylistsByUser,
  useAddToPlaylist,
} from "../../../hooks/queries/playlist";
import { queryClient } from "../../../context/query-client-provider";
import { Bookmark } from "lucide-react";

function AddToPlaylist({ userId, mediaId }) {
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
          <Modal.Title>Save to...</Modal.Title>
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
                isInPlaylist={false}
              />
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddToPlaylist;

function PlaylistItem({ playlist, mediaId, isInPlaylist }) {
  const [isInPlaylistOptimistic, setIsInPlaylistOptimistic] =
    useState(isInPlaylist);
  const { mutate: addToPlaylist } = useAddToPlaylist();

  // call add or remove based on isInPlaylistOptimistic
  const handleAddToPlaylist = (playlistId) => {
    setIsInPlaylistOptimistic((prev) => !prev);
    addToPlaylist({
      playlistId,
      itemId: mediaId,
      isMedia: true,
    });
  };

  return (
    <ListGroup.Item
      key={playlist._id}
      className="d-flex align-items-center justify-content-between py-3 px-4"
    >
      <div className="d-flex align-items-center gap-3">
        {playlist.thumbnail && (
          <img
            src={playlist.thumbnail}
            alt={playlist.title}
            style={{
              width: "80px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        )}
        <div>
          <div className="fw-semibold">{playlist.title}</div>
          <small className="text-muted">
            {playlist.isPublic ? "Public" : "Private"}
          </small>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => handleAddToPlaylist(playlist.id)}
      >
        <Bookmark fill={isInPlaylistOptimistic ? "#222" : "#fff"} />
      </Button>
    </ListGroup.Item>
  );
}
