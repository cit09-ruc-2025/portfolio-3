import { Button } from "react-bootstrap";
import NoData from "../../../components/common/no-data";
import Spinner from "../../../components/layout/spinner";
import { useGetRecentlyViewedList } from "../../../hooks/queries/recently-visited";
import MovieCard from "../../../components/common/movie-card";
import PeopleCard from "../../../components/common/people-card";
import React from "react";

const RecentlyViewedList = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetRecentlyViewedList();

  if (isLoading) {
    return <Spinner />;
  }

  const visitedList = data?.pages?.flatMap((page) => page?.items);
  0;
  const sortedList = visitedList?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );

  const groupedList = sortedList?.reduce((acc, item) => {
    const key = item.mediaId || item.peopleId;
    if (!key) return acc;

    if (!acc[key]) {
      acc[key] = { ...item, count: 1 };
    } else {
      acc[key].count += 1;
    }

    return acc;
  }, {});

  if (!Object.values(groupedList ?? {}).length) {
    return (
      <NoData>
        <History size="30" opacity="0.5" />
        <p className="m-0 fw-semibold">No results found</p>
      </NoData>
    );
  }

  return (
    <div className="d-flex flex-column gap-4 my-2">
      <div className="d-flex flex-column gap-3">
        <div className="search-result">
          {Object.entries(groupedList)?.map(([key, item]) => (
            <React.Fragment key={key}>
              {item.mediaId ? (
                <MovieCard
                  movieDetail={{
                    ...item.media,
                    id: item.mediaId,
                    title: item.media.displayTitle,
                  }}
                  key={item.id}
                />
              ) : (
                <PeopleCard
                  people={{
                    peopleId: item.people.id,
                    personName: item.people.name,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {hasNextPage && (
          <div className="d-flex justify-content-center">
            <Button
              className="primary-button"
              style={{ width: "fit-content" }}
              onClick={fetchNextPage}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyViewedList;
