import { Col, Container, Row } from "react-bootstrap";
import ProfileActionButton from "./profile-action-button";
import { useGetMediaDetail } from "../../../hooks/queries/media";
import MovieImage from "../../../components/common/movie-image";
import Rating from "../../../components/common/rating";

const UserReview = ({ userReview }) => {
  const { isLoading, data } = useGetMediaDetail(userReview.mediaId);

  if (isLoading) return <></>;
  if (!data) return <></>;

  const shortDate = new Intl.DateTimeFormat("da-DK", {
    timeZone: "UTC",
  }).format(new Date(userReview.createdAt));

  return (
    <ProfileActionButton>
      <Container className="d-flex flex-column">
        <Row>
          <Col xs="auto">
            <MovieImage movieDetail={data} height={"172px"} width={"92px"} />
          </Col>

          <Col>
            <h5>{data.title}</h5>
            <p className="muted-paragraph">{data.releaseYear}</p>
            <Rating rating={userReview.rating} />
            <p>{userReview.review}</p>
            <p className="muted-paragraph">Reviewed on {shortDate}</p>
          </Col>
        </Row>
      </Container>
    </ProfileActionButton>
  );
};

//<Row className="justify-content-between align-items-center">
//   <Col xs="auto">
//     <h5>{data.title}</h5>
//   </Col>
//   <Col xs="auto">{shortDate}</Col>
// </Row>
// <Row className="justify-content-between align-items-center">
//   <Col xs="auto">
//     <MovieImage
//       movieDetail={data}
//       height={"auto"}
//       fit={"contain"}
//       width={"80px"}
//     />
//   </Col>

//   <Col>
//   </Col>
//   <Col xs="auto">
//     <Rating rating={userReview.rating} />
//   </Col>
// </Row>

export default UserReview;
