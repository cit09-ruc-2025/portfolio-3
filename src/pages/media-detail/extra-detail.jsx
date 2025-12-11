import { Globe, Link2, LinkIcon } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExtraDetail = ({
  languages,
  production,
  boxOffice,
  titles,
  title,
  website,
}) => {
  const alternate_titles = titles?.filter((t) => t !== title);

  return (
    <Col>
      <h5>Additional Details</h5>
      {languages && (
        <Col className="d-flex flex-row gap-4">
          <p className="fw-semibold">Languages</p>
          <p>{languages.join(", ")}</p>
        </Col>
      )}
      {production && production !== "N/A" && (
        <Col className="d-flex flex-row gap-4">
          <p className="fw-semibold">Production</p>
          <p>{production}</p>
        </Col>
      )}
      {boxOffice && boxOffice !== "N/A" && (
        <Col className="d-flex flex-row gap-4">
          <p className="fw-semibold">Box Office</p>
          <p>{boxOffice}</p>
        </Col>
      )}
      {!!alternate_titles?.length && (
        <Col className="d-flex flex-row gap-4">
          <p className="fw-semibold">Also Known As</p>
          <p>{alternate_titles.join(", ")}</p>
        </Col>
      )}
      {website && website !== "N/A" && (
        <Col className="d-flex flex-row gap-4">
          <p className="fw-semibold">Website</p>
          <Link to={website}>
            <Globe
              style={{
                color: "var(--primary)",
              }}
            />
          </Link>
        </Col>
      )}
    </Col>
  );
};

export default ExtraDetail;
