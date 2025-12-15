import Spinner from "../../../components/layout/spinner";
import { useGetImage } from "../../../hooks/queries/images";

const PeopleHeader = ({ id }) => {
  const { isLoading, data } = useGetImage(id);

  if (isLoading) {
    return <Spinner />;
  }

  const { profile_path } = data?.person_results?.[0] ?? "";

  return (
    <img
      style={{
        width: "250px",
        aspectRatio: "3/4",
        objectFit: "cover",
        borderRadius: "12px",
      }}
      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/w185/${profile_path}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/people-fallback.png";
      }}
    />
  );
};

export default PeopleHeader;
