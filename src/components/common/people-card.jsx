import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetImage } from "../../hooks/queries/images";
import { routeUrls } from "../../libs/route";
import Spinner from "../layout/spinner";

const PeopleCard = ({ people }) => {
  const { description, personName, roleName, peopleId } = people;

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
        <p className="m-0 fw-semibold">{personName}</p>
        <p
          className="m-0"
          style={{ textTransform: "capitalize", fontSize: "14px" }}
        >
          {roleName &&
          description &&
          (roleName === "actor" || roleName === "actress")
            ? description.replace(/['[\]]/g, "")
            : roleName}
        </p>
      </Col>
    </Link>
  );
};

export default PeopleCard;
