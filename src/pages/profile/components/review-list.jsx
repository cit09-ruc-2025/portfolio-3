import { Container } from "react-bootstrap";
import Spinner from "../../../components/layout/spinner";
import { useGetUserReviews } from "../../../hooks/queries/user";
import ProfileActionButton from "./profile-action-button";
import UserReview from "./user-review";

const ReviewList = ({ id }) => {
  const { isLoading, data, isError } = useGetUserReviews(id);

  if (isLoading) return <Spinner />;
  if (isError) return <p>An error occurred.</p>;
  if (!data) return <p>User has not reviewed any media yet!</p>;

  const reviewList = data?.items;

  return (
    <Container className="d-flex flex-column gap-2">
      {reviewList.map((review) => (
        <UserReview key={review.mediaId} userReview={review} />
      ))}
    </Container>
  );
};

export default ReviewList;
