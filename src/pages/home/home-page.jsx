import { Container } from "react-bootstrap";
import TrendingList from "./components/trending-list";
import RecentList from "./components/recent-list";
import RomanceList from "./components/romance-list";
import ActionList from "./components/action-list";
import GenreSuggestionList from "./components/genre-suggestion-list";

export default function HomePage() {
  return (
    <Container>
      <GenreSuggestionList />
      <TrendingList />
      <RecentList />
      <RomanceList />
      <ActionList />
    </Container>
  );
}
