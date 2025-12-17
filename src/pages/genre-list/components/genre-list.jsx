import { Tags } from "lucide-react";
import NoData from "../../../components/common/no-data";
import Spinner from "../../../components/layout/spinner";
import { useGetGenres } from "../../../hooks/queries/genres.js";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

const GenreList = () => {
  const { data, isLoading } = useGetGenres({ page: 1, perPage: 30 });

  if (isLoading) return <Spinner />;

  const genres = data?.items;

  if (!genres?.length) {
    return (
      <NoData>
        <Tags size="30" opacity="0.5" />
        <p className="m-0 fw-semibold">No genres found</p>
      </NoData>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Badge
          as={Link}
          to={`/genre/${genre.name}`}
          bg="secondary"
          className="px-3 py-2 fw-semibold text-decoration-none"
        >
          {genre.name}
        </Badge>
      ))}
    </div>
  );
};

export default GenreList;
