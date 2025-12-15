import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useCreatePlaylist } from "../../../hooks/queries/playlist";
import { queryClient } from "../../../context/query-client-provider";

function CreatePlaylist({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublic: false,
  });
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      title: "",
      description: "",
      isPublic: false,
    });
    setErrors({});
  };

  const handleShow = () => setShowModal(true);

  const { mutate: addPlaylist } = useCreatePlaylist();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addPlaylist(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists", id]);
        handleClose();
      },
    });
  };

  return (
    <>
      <Button
        type="button"
        className="mt-2 primary-button"
        onClick={handleShow}
      >
        Create New Playlist
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-2">
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter playlist title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors?.title}
                />
                {errors?.title && (
                  <Form.Text className="text-danger">{errors.title}</Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter playlist description (optional)"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  isInvalid={!!errors?.description}
                />
                {errors?.description && (
                  <Form.Text className="text-danger">
                    {errors.description}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="isPublic">
                <Form.Check
                  type="checkbox"
                  label="Make this playlist public"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex gap-2 justify-content-end">
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" className="primary-button">
                  Create Playlist
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CreatePlaylist;
