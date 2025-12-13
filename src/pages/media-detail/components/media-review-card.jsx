const MediaReviewCard = ({ userReview }) => {
  const { review, username } = userReview;

  return (
    <>
      <p className="m-0 fw-semibold">{username}</p>
      <p>{review}</p>
    </>
  );
};

export default MediaReviewCard;
