import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../libs/route";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nonSpaceLength = value.replace(/\s/g, "").length;

      if (nonSpaceLength >= 3) {
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
