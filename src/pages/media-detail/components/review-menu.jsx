import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DeleteReview from "./delete-review";

const ReviewMenu = ({ setIsEdit, id }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          id="dropdown-menu-button"
          className="p-0 d-flex align-items-start dropdown-toggle-no-caret"
          style={{ border: "none", background: "transparent" }}
        >
          <MoreVertical size={18} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setIsEdit((prev) => !prev)}>
            Edit
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="text-danger" onClick={() => setShow(true)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteReview setShow={setShow} show={show} id={id} />
    </>
  );
};

export default ReviewMenu;
