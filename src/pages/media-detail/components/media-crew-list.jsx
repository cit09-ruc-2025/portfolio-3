import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Spinner from "../../../components/layout/spinner";
import { useGetMediaPeople } from "../../../hooks/queries/media";
import PeopleCard from "../../../components/common/people-card";

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
      {peopleList?.map((people) => (
        <Col key={`${people.peopleId}-${people.roleId}`} xs={5} md={3}>
          <PeopleCard people={people} />
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

export default MediaCrewList;
