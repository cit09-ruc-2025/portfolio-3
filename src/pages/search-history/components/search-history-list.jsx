import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import { useGetSearchHistory } from "../../../hooks/queries/searchHistory";
import {
  getFormattedDate,
  getFormattedTime,
  groupByDate,
} from "../../../libs/utils";
import { Link } from "react-router-dom";
import { routeUrls } from "../../../libs/route";
import { useState } from "react";
import ClearHistory from "./clear-history";
import NoSearchHistory from "./no-search-history";

const SearchHistoryList = ({ userId }) => {
  const [show, setShow] = useState(false);

  const { data, isLoading, hasNextPage, fetchNextPage } =
    useGetSearchHistory(userId);

  if (isLoading) {
    return <Spinner />;
  }

  const searchItems = data?.pages?.flatMap((page) => page.items);

  if (!searchItems?.length) {
    return <NoSearchHistory />;
  }

  const groupedItems = groupByDate(searchItems, "createdAt");

  return (
    <>
      <div className="d-flex flex-column gap-1">
        <Button
          variant="outline"
          className="m-0"
          style={{ alignSelf: "end" }}
          onClick={() => setShow(true)}
        >
          Clear All
        </Button>
        <div className="d-flex flex-column gap-4">
          {Object.entries(groupedItems).map(([date, item]) => (
            <Card className="p-3">
              <CardTitle style={{ fontSize: "16px" }}>
                {getFormattedDate(date)}
              </CardTitle>
              <CardBody className="p-0 gap-2 d-flex flex-column">
                {item.map((search) => (
                  <Col className="d-flex gap-4 align-items-baseline">
                    <p
                      className="m-0"
                      style={{
                        fontSize: "14px",
                        minWidth: "80px",
                      }}
                    >
                      {getFormattedTime(search.createdAt)}
                    </p>
                    <Link
                      to={`${routeUrls.search}?keyword=${search.searchText}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {search.searchText}
                    </Link>
                  </Col>
                ))}
              </CardBody>
            </Card>
          ))}
          {hasNextPage && (
            <Button
              className="primary-button"
              style={{ width: "fit-content", alignSelf: "center" }}
              onClick={fetchNextPage}
            >
              Load more
            </Button>
          )}
        </div>
      </div>
      <ClearHistory setShow={setShow} show={show} />
    </>
  );
};

export default SearchHistoryList;
