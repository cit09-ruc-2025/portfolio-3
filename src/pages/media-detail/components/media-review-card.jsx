import Rating from "../../../components/common/rating";
import { Star } from "lucide-react";
import { getCookie } from "../../../libs/utils/cookie";
import ReviewMenu from "./review-menu";

const MediaReviewCard = ({ userReview, setIsEdit }) => {
  const { review, username, rating, createdAt, userId, mediaId } = userReview;

  const loggedUserId = getCookie("userId");

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="d-flex flex-column gap-1">
        <div className="w-100 d-flex flex-row justify-content-between">
          <div className="d-flex flex-column">
            <p className="m-0 fw-semibold">{username}</p>
            <p className="m-0" style={{ fontSize: "14px", color: "grey" }}>
              {formattedDate}
            </p>
          </div>
          <div className="d-flex align-items-top" style={{ gap: "2px" }}>
            {Array.from({ length: 10 }).map((_, index) => {
              const starValue = index + 1;

              return (
                <Star
                  key={starValue}
                  size={18}
                  fill={starValue <= rating ? "#f5c518" : "none"}
                  stroke={starValue <= rating ? "#f5c518" : "#ccc"}
                />
              );
            })}
            {loggedUserId === userId && (
              <ReviewMenu setIsEdit={setIsEdit} id={mediaId} />
            )}
          </div>
        </div>
        {review && <p className="m-0">{review}</p>}
      </div>
      <hr className="mb-0" />
    </>
  );
};

export default MediaReviewCard;
