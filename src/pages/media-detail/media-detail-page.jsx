import { useParams } from "react-router-dom";
import { useGetMediaDetail } from "../../hooks/queries/media";
import Spinner from "../../components/layout/spinner";
import { Badge, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { Calendar, Clock, Star } from "lucide-react";
import MediaHeader from "./media-header";
import ExtraDetail from "./extra-detail";
import MediaCrewList from "./media-crew-list";

const MediaDetailPage = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetMediaDetail(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p>Error Occured</p>;
  }

  const {
    averageRating,
    ageRating,
    boxOffice,
    endYear,
    imdbAverageRating,
    production,
    releaseYear,
    runtimeMinutes,
    websiteUrl,
    poster,
    plot,
    genres,
    title,
    titles,
    languages,
  } = data;

  return (
    <Container fluid className=" d-flex flex-column p-0 gap-2">
      <MediaHeader averageRating={averageRating} title={title} />
      <Container className="mt-5 d-flex flex-column gap-2">
        <Col className="d-flex flex-row gap-1 flex-wrap mb-4">
          {genres?.map((g) => (
            <Badge bg="secondary" pill key={g}>
              {g}
            </Badge>
          ))}
        </Col>
        <Row>
          <Col xs={12} md={8}>
            <h5>Overview</h5>
            <p>{plot}</p>
          </Col>
          <Col xs={12} md={4}>
            <Card style={{ fontSize: "14px" }}>
              <CardBody className="d-flex flex-column gap-3">
                <div className="d-flex gap-1 align-items-center">
                  <Calendar size="16" />
                  Release: {releaseYear}
                </div>
                {!!endYear && (
                  <div className="d-flex gap-1 align-items-center">
                    <Calendar size="16" />
                    End: {endYear}
                  </div>
                )}
                {runtimeMinutes && runtimeMinutes !== "N/A" && (
                  <div className="d-flex gap-1 align-items-center">
                    <Clock size="16" />
                    Runtime: {runtimeMinutes} min
                  </div>
                )}
                <div className="d-flex gap-1 align-items-center">
                  <Star size="16" />
                  IMDB Rating: {parseFloat(imdbAverageRating ?? 0).toFixed(1)}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <h5>Crew</h5>
          <MediaCrewList id={id} />
        </Row>
        <ExtraDetail
          languages={languages}
          production={production}
          boxOffice={boxOffice}
          titles={titles}
          title={title}
          website={websiteUrl}
        />
      </Container>
    </Container>
  );
};

export default MediaDetailPage;
