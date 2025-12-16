import { Tags } from "lucide-react";
import NoData from "../../../components/common/no-data";
import Spinner from "../../../components/layout/spinner";
import { useGetGenres } from "../../../hooks/queries/genres.js";

const GenreList = () => {
  const { data, isLoading } = useGetGenres();

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
        <div
          key={genre.id}
          className="px-3 py-2 rounded border fw-semibold"
          style={{ cursor: "pointer" }}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default GenreList;
