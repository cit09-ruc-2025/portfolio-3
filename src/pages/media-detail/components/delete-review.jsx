import { Button, Modal } from "react-bootstrap";
import { useDeleteReview } from "../../../hooks/queries/review";
import { queryClient } from "../../../context/query-client-provider";

const DeleteReview = ({ show, setShow, id }) => {
  const handleClose = () => setShow(false);

  const { mutate: deleteReview, isPending } = useDeleteReview(id);

  const onDelete = () => {
    deleteReview(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["media-reviews"]);
        queryClient.invalidateQueries(["media-user-status"]);
        setShow(false);
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
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

export default DeleteReview;
