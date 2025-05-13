import { FC } from "react";
import Rating from "../Rating";

interface ReviewProps {
  name: string;
  date: Date;
  rating: number;
  comment: string;
}

const Review: FC<ReviewProps> = ({ name, date, rating, comment }) => {
  return (
    <div>
      <div className="divider"></div>
      <div className="">
        <h3>{name}</h3>
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <Rating starsCount={rating} />
      <p>{comment}</p>
    </div>
  );
};

export default Review;
