import { Tags } from "lucide-react";
import { Container } from "react-bootstrap";
import GenreList from "./components/genre-list";

const GenreListPage = () => {
  return (
    <Container className="mt-3 d-flex flex-column gap-3">
      <div className="d-flex gap-2 align-items-end">
        <Tags />
        <h3 className="m-0">Genres</h3>
      </div>

      <GenreList />
    </Container>
  );
};

export default GenreListPage;
