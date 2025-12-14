import Rating from "../../../components/common/rating";

const MediaReviewCard = ({ userReview }) => {
  const { review, username } = userReview;

  return (
    <>
      <p className="m-0 fw-semibold">{username}</p>
      <p>{review}</p>
      <Rating rating={userReview.rating} />
    </>
  );
};

export default MediaReviewCard;
