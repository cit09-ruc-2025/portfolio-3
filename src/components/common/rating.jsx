import { Star, StarHalf } from "lucide-react";
import { Container } from "react-bootstrap";

const Rating = ({ rating }) => {
  return (
    <div className="mb-1">
      {Array.from({ length: rating }, () => (
        <Star fill={"var(--rating)"} strokeWidth={0} />
      ))}
      {Array.from({ length: 10 - rating }, () => (
        <Star fill={"#111"} strokeWidth={0} />
      ))}{" "}
      {rating}/10
    </div>
  );
};

export default Rating;
