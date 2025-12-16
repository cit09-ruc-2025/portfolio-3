import { Heart } from "lucide-react";
import { Button } from "react-bootstrap";
import { getCookie } from "../../libs/utils/cookie";
import {
  useAddToFavorite,
  useRemoveFromFavorite,
} from "../../hooks/queries/favorite";
import { queryClient } from "../../context/query-client-provider";

const AddToFav = ({ isFavorite, isMedia, id }) => {
  const userId = getCookie("userId");

  const { mutate: addToFav, isPending } = useAddToFavorite(userId, isMedia);
  const { mutate: removeFromFav, isPending: isRemovePending } =
    useRemoveFromFavorite(userId, isMedia);

  const handleFavorite = () => {
    if (!isFavorite) {
      addToFav(isMedia ? { mediaId: id } : { peopleId: id }, {
        onSuccess: () => {
          if (isMedia) {
            queryClient.invalidateQueries(["media-user-status"]);
          } else {
            queryClient.invalidateQueries(["people-user-status"]);
          }
        },
      });
    } else {
      removeFromFav(id, {
        onSuccess: () => {
          if (isMedia) {
            queryClient.invalidateQueries(["media-user-status"]);
          } else {
            queryClient.invalidateQueries(["people-user-status"]);
          }
        },
      });
    }
  };
  return (
    <Button
      variant="outline"
      style={{ padding: 0, color: isFavorite ? "red" : "white" }}
      onClick={handleFavorite}
      disabled={isPending || isRemovePending}
    >
      <Heart
        fill={isFavorite ? "red" : "transparent"}
        stroke={isFavorite ? "red" : "black"}
      />
    </Button>
  );
};

export default AddToFav;
