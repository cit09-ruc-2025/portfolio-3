import { MoreVertical } from "lucide-react";
import { Dropdown } from "react-bootstrap";

const ReviewMenu = ({ setIsEdit }) => {
  return (
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
        <Dropdown.Item
          className="text-danger"
          onClick={() => console.log("Delete clicked")}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ReviewMenu;
