import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../../components/common/movie-card";
import ReusableSlider from "../../../components/layout/slider";
import Spinner from "../../../components/layout/spinner";

const HomePageList = ({ moviesQuery, listTitel }) => {
  return (
    <Container className="mb-4">
      <p style={{ fontSize: "20px", fontWeight: "500" }}>{listTitel}</p>
      <MovieList data={moviesQuery.data} isLoading={moviesQuery.isLoading} />
    </Container>
  );
};
export default HomePageList;

const MovieList = ({ data, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (!data) {
    return <p>Error Occurred</p>;
  }

  const { items: movieList } = data;

  return (
    <Row>
      <ReusableSlider slidesToShow={4} showDots={false}>
        {movieList?.map((movie) => (
          <MovieCard movieDetail={movie} key={movie.id} />
        ))}
      </ReusableSlider>
    </Row>
  );
};
