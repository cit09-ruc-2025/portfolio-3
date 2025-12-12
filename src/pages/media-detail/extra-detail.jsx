import { Globe, Link2, LinkIcon } from "lucide-react";
import { useState } from "react";
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
  const [showAllTitles, setShowAllTitles] = useState(false);

  const alternate_titles = titles?.filter((t) => t !== title) || [];

  const visible_titles =
    alternate_titles?.length <= 10 || showAllTitles
      ? alternate_titles
      : alternate_titles.slice(0, 10);

  return (
    <Col className="mb-5">
      <h5>Additional Details</h5>
      {languages && (
        <>
          <Col className="d-flex flex-row gap-4 mb-1">
            <p className="fw-semibold m-0">Languages</p>
            <p className="m-0">{languages.join(", ")}</p>
          </Col>
          <hr className="m-0" />
        </>
      )}
      {production && production !== "N/A" && (
        <>
          <Col className="d-flex flex-row gap-4 mb-1">
            <p className="fw-semibold m-0">Production</p>
            <p className="m-0">{production}</p>
          </Col>
          <hr className="m-0" />
        </>
      )}
      {boxOffice && boxOffice !== "N/A" && (
        <>
          <Col className="d-flex flex-row gap-4 mb-1">
            <p className="fw-semibold m-0">Box Office</p>
            <p className="m-0">{boxOffice}</p>
          </Col>
          <hr className="m-0" />
        </>
      )}
      {!!alternate_titles?.length && (
        <>
          <Col className="d-flex flex-row gap-4 mb-1">
            <p className="fw-semibold m-0">Also Known As</p>
            <p className="m-0">
              {visible_titles.join(", ")}
              &nbsp;
              {alternate_titles?.length > 10 && (
                <span
                  className="show-more-btn"
                  onClick={() => setShowAllTitles((prev) => !prev)}
                >
                  {showAllTitles ? "Show Less" : "Show All"}
                </span>
              )}
            </p>
          </Col>
          <hr className="m-0" />
        </>
      )}
      {website && website !== "N/A" && (
        <>
          <Col className="d-flex flex-row gap-4 mb-1">
            <p className="fw-semibold m-0">Website</p>
            <Link to={website}>
              <Globe
                style={{
                  color: "var(--primary)",
                }}
              />
            </Link>
          </Col>
          <hr className="m-0" />
        </>
      )}
    </Col>
  );
};

export default ExtraDetail;
