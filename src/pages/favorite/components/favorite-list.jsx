import { Button } from "react-bootstrap";
import MovieCard from "../../../components/common/movie-card";
import {
  useGetFavoriteMediaList,
  useGetFavoritePeopleList,
} from "../../../hooks/queries/images";
import { getCookie } from "../../../libs/utils/cookie";
import PeopleCard from "../../../components/common/people-card";
import Spinner from "../../../components/layout/spinner";
import NoData from "../../../components/common/no-data";
import { Heart } from "lucide-react";

const FavoriteList = () => {
  const userId = getCookie("userId");

  const {
    data: medias,
    isLoading: isMediaLoading,
    fetchNextPage: fetchNextMediaPage,
    hasNextPage: hasNextMediaPage,
  } = useGetFavoriteMediaList(userId);

  const {
    data: people,
    isLoading: isPeopleLoading,
    fetchNextPage: fetchNextPeoplePage,
    hasNextPage: hasNextPeoplePage,
  } = useGetFavoritePeopleList(userId);

  if (isMediaLoading || isPeopleLoading) {
    return <Spinner />;
  }

  const mediaList = medias?.pages?.flatMap((page) => page?.items);
  const peopleList = people?.pages?.flatMap((page) => page?.items);

  if (!mediaList.length && !peopleList.length) {
    return (
      <NoData>
        <Heart size="30" opacity="0.5" />
        <p className="m-0 fw-semibold">No results found</p>
      </NoData>
    );
  }

  return (
    <div className="d-flex flex-column gap-4 my-2">
      {!!mediaList?.length && (
        <div className="d-flex flex-column gap-3">
          <h4>Media</h4>
          <div className="search-result">
            {mediaList?.map((media) => (
              <MovieCard
                movieDetail={{ ...media, id: media.mediaId }}
                key={media.id}
              />
            ))}
          </div>
          {hasNextMediaPage && (
            <div className="d-flex justify-content-center">
              <Button
                className="primary-button"
                style={{ width: "fit-content" }}
                onClick={fetchNextMediaPage}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
      {!!peopleList?.length && (
        <div className="d-flex flex-column gap-3">
          <h4>People</h4>
          <div className="search-result-people">
            {peopleList?.map((people) => (
              <PeopleCard
                key={people.peopleId}
                people={{
                  peopleId: people.peopleId,
                  personName: people.name,
                }}
              />
            ))}
          </div>
          {hasNextPeoplePage && (
            <div className="d-flex justify-content-center">
              <Button className="primary-button" onClick={fetchNextPeoplePage}>
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
