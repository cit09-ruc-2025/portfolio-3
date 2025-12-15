import { List, MoreVertical } from "lucide-react";
import { Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../libs/route";
import ProfileActionButton from "./profile-action-button";

const PlaylistButton = ({
  playlist,
  setIsEdit,
  setIsDelete,
  setPlaylistId,
}) => {
  const { title, description, mediaIds, id } = playlist;
  const navigate = useNavigate();

  return (
    <ProfileActionButton
      onClick={() => {
        navigate(routeUrls.playlist.replace(":id", id));
      }}
    >
      <Container className="d-flex flex-column gap-1 p-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-1 align-items-center">
            <List className="action-button-icon" />
            <h5 className="mb-0">{title}</h5>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <p className="m-0">
              {mediaIds.length > 0 ? `${mediaIds.length} items` : "0 item"}
            </p>
            <Dropdown onClick={(e) => e.stopPropagation()}>
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
                  onClick={() => {
                    setIsDelete(true);
                    setPlaylistId(id);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <p>{description}</p>
      </Container>
    </ProfileActionButton>
  );
};

export default PlaylistButton;
