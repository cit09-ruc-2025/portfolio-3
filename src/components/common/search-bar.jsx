import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../libs/route";
import { getCookie } from "../../libs/utils/cookie";
import { useAddSearchHistory } from "../../hooks/queries/searchHistory";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const { mutate: addSearchKeyword } = useAddSearchHistory();

  const token = getCookie("token");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nonSpaceLength = value.replace(/\s/g, "").length;

      if (nonSpaceLength) {
        if (token) {
          addSearchKeyword(value);
        }
        navigate(
          `${routeUrls.search}?keyword=${encodeURIComponent(value.trim())}`
        );
      }
    }
  };

  return (
    <Form className="d-flex mx-auto">
      <FormControl
        type="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Form>
  );
};

export default SearchBar;
