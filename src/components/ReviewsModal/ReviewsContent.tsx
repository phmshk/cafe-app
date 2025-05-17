import { FC, useMemo, useState } from "react";
import ReviewItem from "./ReviewItem";
import { ReviewData } from "../../utils/review";

interface ReviewsContentProps {
  handleModalClose: () => void;
  reviews: ReviewData[];
  restaurantScore: string;
  totalRatings: number;
}
const ReviewsContent: FC<ReviewsContentProps> = ({
  handleModalClose,
  reviews,
  restaurantScore,
  totalRatings,
}) => {
  const [sortType, setSortType] = useState<string>("");

  const sortedReviews = useMemo(
    () =>
      [...reviews].sort((a, b) => {
        switch (sortType) {
          case "new":
            return b.date.getTime() - a.date.getTime();
          case "good":
            return b.rating - a.rating;
          case "bad":
            return a.rating - b.rating;
          default:
            return 0;
        }
      }),
    [reviews, sortType]
  );

  return (
    <div className="join join-vertical w-full">
      <div className="mb-1 rounded-2xl bg-white w-full p-5">
        <div className="flex items-center justify-between">
          <h2>Rating</h2>
          <div
            className="flex items-center justify-center text-base-content/50 hover:bg-base-300 w-8 h-8 rounded-box cursor-pointer"
            role="button"
            onClick={handleModalClose}
          >
            X
          </div>
        </div>
        <div className="flex justify-center flex-col">
          <h3 className="text-center text-5xl font-extrabold mt-8 text-black">
            {restaurantScore}
          </h3>
          <span className="text-neutral/50 text-center font-light text-sm">
            {totalRatings} ratings &middot; {reviews.length} reviews
          </span>
        </div>
      </div>
      <div className="rounded-2xl bg-white w-full p-5">
        <div className="flex items-center justify-between">
          <h2>Reviews</h2>
          <select
            name="reviews"
            className="text-black rounded-2xl px-4 py-2 cursor-pointer bg-base-300"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="new">Newest First</option>
            <option value="good">Good first</option>
            <option value="bad">Bad first</option>
          </select>
        </div>
        <div className="h-[calc(100vh-300px)] overflow-y-auto pr-3">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsContent;
