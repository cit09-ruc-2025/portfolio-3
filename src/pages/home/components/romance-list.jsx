import { useGetGenreMedia } from "../../../hooks/queries/genres";
import HomePageList from "./homepage-list";

const RomanceList = () => {
  const moviesQuery = useGetGenreMedia({
    genreName: "romance",
  });

  return <HomePageList moviesQuery={moviesQuery} listTitel={"Romance"} />;
};
export default RomanceList;
