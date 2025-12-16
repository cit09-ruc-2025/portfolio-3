import { useGetMediaList } from "../../../hooks/queries/media";
import HomePageList from "./homepage-list";

const RecentList = () => {
  const moviesQuery = useGetMediaList({
    orderBy: "release_year",
  });

  return (
    <HomePageList moviesQuery={moviesQuery} listTitel={"Recent Releases"} />
  );
};
export default RecentList;
