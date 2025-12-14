import { useState } from "react";
import { useGetMediaReviews } from "../../../hooks/queries/media";
import { Row, Col, Spinner, Button } from "react-bootstrap";
import MediaReviewCard from "./media-review-card";
import { getCookie } from "../../../libs/utils/cookie";
import AddReview from "./add-review";

const MediaReviewList = ({ id, isReviewed }) => {
  const [showAll, setShowAll] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const { isLoading, data, fetchNextPage, hasNextPage } =
    useGetMediaReviews(id);

  const token = getCookie("token");
  const loggedInUserId = getCookie("userId");

  if (isLoading) {
    return <Spinner />;
  }

  const reviews = showAll
    ? data?.pages?.flatMap((page) => {
        return page.items;
      })
    : data?.pages?.[0]?.items;

  return (
    <Row className="gy-3">
      {token && !isReviewed && <AddReview mediaId={id} />}
      {reviews?.length > 0 ? (
        <div className="d-flex flex-column gap-2">
          {reviews?.map((review, i) => (
            <div key={i}>
              {isEdit && loggedInUserId === review.userId ? (
                <AddReview
                  mediaId={id}
                  review={review.review}
                  rating={review.rating}
                  setIsEdit={setIsEdit}
                />
              ) : (
                <MediaReviewCard userReview={review} setIsEdit={setIsEdit} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Be the first to write a review!</p>
      )}
      {data?.pages[0]?.numberOfPages > 1 && (
        <Row className="justify-content-center" style={{ marginTop: "70px" }}>
          <Col xs="auto">
            <Button
              className="primary-button"
              onClick={() => {
                if (hasNextPage) {
                  setShowAll(true);
                  fetchNextPage();
                } else {
                  setShowAll(false);
                }
              }}
            >
              {hasNextPage ? "Show More" : "Show Less"}
            </Button>
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default MediaReviewList;
