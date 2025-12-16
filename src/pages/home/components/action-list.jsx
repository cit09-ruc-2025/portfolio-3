import { useGetGenreMedia } from "../../../hooks/queries/genres";
import HomePageList from "./homepage-list";

const ActionList = () => {
  const moviesQuery = useGetGenreMedia({
    genreName: "action",
  });

  return <HomePageList moviesQuery={moviesQuery} listTitel={"Action"} />;
};
export default ActionList;
