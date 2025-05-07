import { FC } from "react";

interface RatingProps {
  starsCount: number;
}

const Rating: FC<RatingProps> = ({ starsCount }) => {
  const rating = [];
  for (let i = 1; i <= 5; i++) {
    rating.push(
      <div
        key={i}
        className="mask mask-star"
        aria-label={`${i} star`}
        aria-current={`${i === starsCount}`}
      ></div>
    );
  }

  return <div className="rating rating-sm">{rating}</div>;
};

export default Rating;
