import { Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const GENRES = ["Action", "Comedy", "Drama", "Romance", "Sci-Fi", "Horror"];

const GenreSuggestionList = () => {
  const { genreName } = useParams();
  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      {GENRES.map((genre) => {
        const isActive = genreName === genre;
        return (
          <Badge
            key={genre}
            as={Link}
            to={`/genre/${genre}`}
            bg="secondary"
            className="px-3 py-2 fw-semibold text-decoration-none"
            style={{
              backgroundColor: `${
                isActive ? "var(--secondary) !important" : ""
              }`,
            }}
          >
            {genre}
          </Badge>
        );
      })}

      <Badge
        as={Link}
        to="/genres"
        bg="primary"
        className="px-3 py-2 fw-semibold text-decoration-none"
        style={{ backgroundColor: "var(--primary) !important" }}
      >
        All genres
      </Badge>
    </div>
  );
};

export default GenreSuggestionList;
