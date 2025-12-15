import { Heart } from "lucide-react";
import { Container } from "react-bootstrap";
import FavoriteList from "./components/favorite-list";

const FavoritePage = () => {
  return (
    <Container className="mt-3 d-flex flex-column gap-3">
      <div className="d-flex gap-2 align-items-end">
        <Heart />
        <h3 className="m-0">Favorites</h3>
      </div>
      <FavoriteList />
    </Container>
  );
};

export default FavoritePage;
