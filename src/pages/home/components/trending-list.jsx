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
    <Container>
      <p style={{ fontSize: "20px", fontWeight: "500" }}>Trending</p>
      <MovieList data={data} isLoading={isLoading} />
    </Container>
  );
};
export default TrendingList;

const MovieList = ({ data, isLoading }) => {
  if (isLoading)
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <Spinner />
      </div>
    );

  const { items: movieList } = data;

  if (!data) {
    return <p>An Error Occurred</p>;
  }

  return (
    <Row>
      <ReusableSlider slidesToShow={4} showDots={false}>
        {movieList.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} className="mb-3">
            <MovieCard movieDetail={movie} />
          </Col>
        ))}
      </ReusableSlider>
    </Row>
  );
};
