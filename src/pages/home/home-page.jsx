import { Container } from "react-bootstrap";
import TrendingList from "./components/trending-list";
import RecentList from "./components/recent-list";

export default function HomePage() {
  return (
    <Container>
      <TrendingList />
      <RecentList />
    </Container>
  );
}
