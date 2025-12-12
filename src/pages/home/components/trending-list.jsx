import { Col, Container, Row } from "react-bootstrap";
import { useGetMediaList } from "../../../hooks/queries/media";
import MovieCard from "../../../components/common/movie-card";
import ReusableSlider from "../../../components/layout/slider";
import Spinner from "../../../components/layout/spinner";

const TrendingList = () => {
  const { isLoading, data } = useGetMediaList({
    orderBy: "imdb_average_rating",
  });

  return (
    <Container className="mb-4">
      <p style={{ fontSize: "20px", fontWeight: "500" }}>Trending</p>
      <MovieList data={data} isLoading={isLoading} />
    </Container>
  );
};
export default TrendingList;

const MovieList = ({ data, isLoading }) => {
  if (isLoading) return <Spinner />;

  const { items: movieList } = data;

  if (!data) {
    return <p>Error Occurred</p>;
  }

  return (
    <Row>
      <ReusableSlider slidesToShow={4} showDots={false}>
        {movieList.map((movie) => (
          <MovieCard movieDetail={movie} key={movie.id} />
        ))}
      </ReusableSlider>
    </Row>
  );
};
