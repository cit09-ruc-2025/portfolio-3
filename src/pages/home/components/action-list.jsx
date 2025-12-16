import { useGetGenreMedia } from "../../../hooks/queries/genres";
import HomePageList from "./homepage-list";

const ActionList = () => {
  const moviesQuery = useGetGenreMedia({
    id: "72e77b3b-2831-41ce-bd9d-a45ffa12e928",
  });

  return <HomePageList moviesQuery={moviesQuery} listTitel={"Action"} />;
};
export default ActionList;
