import { Star, StarHalf } from "lucide-react";
import { Container } from "react-bootstrap";

const Rating = ({ rating }) => {
  return (
    <div className="mb-1">
      {Array.from({ length: rating }, () => (
        <Star fill={"var(--rating)"} stroke={"var(--rating)"} />
      ))}
      {Array.from({ length: 10 - rating }, () => (
        <Star fill="none" stroke="#ccc" />
      ))}
    </div>
  );
};

export default Rating;
