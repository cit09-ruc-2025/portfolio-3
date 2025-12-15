import { Button, Modal } from "react-bootstrap";
import { useClearSearchHistory } from "../../../hooks/queries/searchHistory";
import { queryClient } from "../../../context/query-client-provider";

const ClearHistory = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  const { mutate: deleteReview, isPending } = useClearSearchHistory();

  const onDelete = () => {
    deleteReview(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["search-history"]);
        setShow(false);
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Clear History</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to clear history?</Modal.Body>
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

export default ClearHistory;
