import { useState } from "react";
import { useGetMediaReviews } from "../../../hooks/queries/media";
import { Row, Col, Spinner } from "react-bootstrap";
import MediaReviewCard from "./media-review-card";

const MediaReviewList = ({ id }) => {
  const [showAll, setShowAll] = useState(true);
  const { isLoading, data, fetchNextPage, hasNextPage } =
    useGetMediaReviews(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>Be the first to write a review!</p>;
  }

  const reviews = showAll
    ? data?.pages?.flatMap((page) => {
        return page.items;
      })
    : data?.pages?.[0]?.items;

  return (
    <Row className="gy-3">
      {reviews?.map((review, i) => (
        <Col key={i} xs={5} md={3}>
          <MediaReviewCard userReview={review} />
        </Col>
      ))}
      {data.pages[0].numberOfPages > 1 && (
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
