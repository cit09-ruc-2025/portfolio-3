import { useGetGenreMedia } from "../../../hooks/queries/genres";
import HomePageList from "./homepage-list";

const RomanceList = () => {
  const moviesQuery = useGetGenreMedia({
    id: "1dd355a9-ff49-4d6c-9a18-cfebbbd71162",
  });

  return <HomePageList moviesQuery={moviesQuery} listTitel={"Romance"} />;
};
export default RomanceList;
