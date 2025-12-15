import { useParams } from "react-router-dom";
import { useGetPeopleDetail } from "../../hooks/queries/people";
import { Col, Container, Spinner } from "react-bootstrap";
import PeopleHeader from "./components/people-header";
import { Calendar } from "lucide-react";
import PeopleMediaList from "./components/people-media-list";

const PeopleDetailPage = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetPeopleDetail(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>Error Occurred</p>;
  }

  const { name, birthDate, deathDate, description } = data;

  return (
    <Container className="d-flex flex-column gap-3 mt-4">
      <div className="d-flex flex-row gap-4 align-items-start">
        <PeopleHeader id={id} />
        <div className="d-flex flex-column gap-4 mt-4">
          <Col>
            <h2>{name}</h2>
            {birthDate && (
              <div
                className="d-flex gap-1 align-items-center"
                style={{ color: "#8f8c8c" }}
              >
                <Calendar size={"16"} />
                <p className="m-0">{birthDate}</p>
                {deathDate && <p className="m-0"> - {deathDate}</p>}
              </div>
            )}
          </Col>
          {description && (
            <Col>
              <h4>Biography</h4>
              {description}
            </Col>
          )}
        </div>
      </div>
      <Col>
        <h4>Known For</h4>
        <PeopleMediaList id={id} />
      </Col>
    </Container>
  );
};

export default PeopleDetailPage;
