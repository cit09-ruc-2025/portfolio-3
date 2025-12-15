import { useState } from "react";
import {
  useAddToPlaylist,
  useRemoveFromPlaylist,
} from "../../../hooks/queries/playlist";
import { Button, ListGroup } from "react-bootstrap";
import { Bookmark } from "lucide-react";

const PlaylistItem = ({ playlist, mediaId, isInPlaylist }) => {
  const [isInPlaylistOptimistic, setIsInPlaylistOptimistic] =
    useState(isInPlaylist);

  const { mutate: addToPlaylist } = useAddToPlaylist();
  const { mutate: removeFromPlaylist } = useRemoveFromPlaylist(
    playlist.id,
    true
  );

  const handleAddToPlaylist = (playlistId) => {
    if (!isInPlaylistOptimistic) {
      addToPlaylist({
        playlistId,
        itemId: mediaId,
        isMedia: true,
      });
    } else {
      removeFromPlaylist(mediaId);
    }
    setIsInPlaylistOptimistic((prev) => !prev);
  };

  return (
    <ListGroup.Item
      key={playlist.id}
      className="d-flex align-items-center justify-content-between py-3 px-4"
    >
      <div className="d-flex align-items-center gap-3">
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
        <Bookmark
          fill={isInPlaylistOptimistic ? "#f5c518" : "#fff"}
          stroke={isInPlaylistOptimistic ? "#f5c518" : "#000"}
        />
      </Button>
    </ListGroup.Item>
  );
};

export default PlaylistItem;
