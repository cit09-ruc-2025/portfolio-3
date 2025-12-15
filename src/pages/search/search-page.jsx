import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../../components/common/movie-card";
import PeopleCard from "../../components/common/people-card";
import Spinner from "../../components/layout/spinner";
import { useSearchMedia, useSearchPeople } from "../../hooks/queries/search";
import { routeUrls } from "../../libs/route";
import NoData from "../../components/common/no-data";
import { Search } from "lucide-react";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  const navigate = useNavigate();

  const {
    data: mediaData,
    isLoading: isMediaLoading,
    hasNextPage: hasNextMediaPage,
    fetchNextPage: fetchNextMediaPage,
  } = useSearchMedia(keyword);

  const {
    data: peopleData,
    isLoading: isPeopleLoading,
    hasNextPage: hasNextPeoplePage,
    fetchNextPage: fetchNextPeoplePage,
  } = useSearchPeople(keyword);

  useEffect(() => {
    if (!keyword) {
      navigate(routeUrls.homepage, { replace: true });
    }
  }, [keyword, navigate]);

  if (isMediaLoading || isPeopleLoading) {
    return <Spinner />;
  }

  const mediaItems = mediaData?.pages?.flatMap((page) => page.items);
  const peopleItems = peopleData?.pages?.flatMap((page) => page.items);

  return (
    <Container>
      <h3>Search results for: "{keyword}"</h3>

      {!mediaItems?.length && !peopleItems?.length ? (
        <NoData>
          <Search size="30" opacity="0.5" />
          <p className="m-0 fw-semibold">No results found</p>
          <p className="m-0">Try searching for something else</p>
        </NoData>
      ) : (
        <>
          {!!mediaItems?.length && (
            <div className="d-flex flex-column gap-3 mt-5">
              <h4>Media</h4>
              <div className="search-result">
                {mediaItems?.map((media) => (
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
          {!!peopleItems?.length && (
            <div className="d-flex flex-column gap-3 mt-5">
              <h4>People</h4>
              <div className="search-result-people">
                {peopleItems?.map((people) => (
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
                  <Button
                    className="primary-button"
                    onClick={fetchNextPeoplePage}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchPage;
