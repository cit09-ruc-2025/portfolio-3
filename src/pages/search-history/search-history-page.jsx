import { Search } from "lucide-react";
import { Container } from "react-bootstrap";
import { getCookie } from "../../libs/utils/cookie";
import SearchHistoryList from "./components/search-history-list";

const SearchHistoryPage = () => {
  const userId = getCookie("userId");

  return (
    <Container className="mt-3">
      <div className="d-flex gap-2 align-items-center">
        <Search />
        <h3 className="m-0">Search History</h3>
      </div>
      <SearchHistoryList userId={userId} />
    </Container>
  );
};

export default SearchHistoryPage;
