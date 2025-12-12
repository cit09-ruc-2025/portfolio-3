import { Button, Col, Row } from "react-bootstrap";
import { useGetMediaPeople } from "../../hooks/queries/media";
import Spinner from "../../components/layout/spinner";
import MediaCrewCard from "./media-crew-card";
import { useState } from "react";

const MediaCrewList = ({ id }) => {
  const [showAll, setShowAll] = useState(true);
  const { isLoading, data, fetchNextPage, hasNextPage } = useGetMediaPeople(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>No data</p>;
  }

  const peopleList = showAll
    ? data?.pages?.flatMap((page) => {
        return page.items;
      })
    : data?.pages?.[0]?.items;

  return (
    <Row className="gy-3">
      {peopleList?.map((people, i) => (
        <Col key={i} xs={5} md={3}>
          <MediaCrewCard people={people} />
        </Col>
      ))}
      <Row className="justify-content-center mt-4">
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
    </Row>
  );
};

export default MediaCrewList;
