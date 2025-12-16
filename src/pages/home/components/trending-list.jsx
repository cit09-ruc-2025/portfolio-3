import { useGetMediaList } from "../../../hooks/queries/media";
import HomePageList from "./homepage-list";

const TrendingList = () => {
  const moviesQuery = useGetMediaList({
    orderBy: "imdb_average_rating",
  });

  return <HomePageList moviesQuery={moviesQuery} listTitel={"Trending"} />;
};
export default TrendingList;
