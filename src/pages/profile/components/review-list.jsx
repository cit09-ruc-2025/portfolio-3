import { Container } from "react-bootstrap";
import Spinner from "../../../components/layout/spinner";
import { useGetUserReviews } from "../../../hooks/queries/user";
import ProfileActionButton from "./profile-action-button";
import UserReview from "./user-review";
import ErrorComponent from "../../../components/layout/error-component";

const ReviewList = ({ id }) => {
  const { isLoading, data, isError } = useGetUserReviews(id);

  if (isLoading) return <Spinner />;

  if (isError) return <ErrorComponent />;

  const reviewList = data?.items;

  if (!reviewList.length)
    return (
      <ErrorComponent errorMessage="User has not reviewed any media yet!" />
    );

  return (
    <Container className="d-flex flex-column gap-2">
      {reviewList.map((review) => (
        <UserReview key={review.mediaId} userReview={review} />
      ))}
    </Container>
  );
};

export default ReviewList;
