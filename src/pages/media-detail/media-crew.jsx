import { Col } from "react-bootstrap";
import { useGetImage } from "../../hooks/queries/images";
import Spinner from "../../components/layout/spinner";
import { Link } from "react-router-dom";
import { routeUrls } from "../../libs/route";

const MediaCrew = ({ people }) => {
  const { peopleId, character, name, role } = people;
  const { isLoading, data } = useGetImage(peopleId);

  const { profile_path } = data?.person_results?.[0] ?? "";

  return (
    <Link
      to={routeUrls.person.replace(":id", peopleId)}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Col className="d-flex flex-column align-items-center">
        <div style={{ minHeight: "50px" }}>
          {isLoading ? (
            <Spinner />
          ) : (
            <img
              className="rounded-circle"
              style={{ width: "150px", aspectRatio: "1", objectFit: "cover" }}
              src={`${
                import.meta.env.VITE_IMAGE_BASE_URL
              }/w185/${profile_path}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/people-fallback.png";
              }}
            />
          )}
        </div>
        <p className="m-0 fw-semibold">{name}</p>
        <p
          className="m-0"
          style={{ textTransform: "capitalize", fontSize: "14px" }}
        >
          {role === "actor" || role === "actress"
            ? character.replace(/['[\]]/g, "")
            : role}
        </p>
      </Col>
    </Link>
  );
};

export default MediaCrew;
