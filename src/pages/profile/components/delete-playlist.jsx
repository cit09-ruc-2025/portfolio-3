import { Button, Modal } from "react-bootstrap";
import { queryClient } from "../../../context/query-client-provider";
import { useDeletePlaylist } from "../../../hooks/queries/playlist";

const DeletePlaylist = ({ show, setShow, id }) => {
  const handleClose = () => setShow(false);

  const { mutate: deleteReview, isPending } = useDeletePlaylist(id);

  const onDelete = () => {
    deleteReview(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists"]);
        setShow(false);
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this playlist?</Modal.Body>
      <Modal.Footer>
        <Button className="secondary-button" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={isPending}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePlaylist;
