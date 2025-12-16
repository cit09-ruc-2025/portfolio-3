import { Button, Modal } from "react-bootstrap";
import { useLogout } from "../../hooks/queries/auth";

const LogoutModal = ({ showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);

  const logout = useLogout();

  const onLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to log out?</Modal.Body>
      <Modal.Footer>
        <Button className="secondary-button" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onLogout}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
