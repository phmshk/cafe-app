import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

export interface ReviewData {
  id: string;
  name: string;
  date: Date;
  rating: number;
  comment: string;
}

export function createReviews(numberOfReviews: number): ReviewData[] {
  const reviews: ReviewData[] = [];
  for (let i = 0; i < numberOfReviews; i++) {
    const newReview = {
      id: nanoid(6),
      name: faker.internet.username(),
      date: faker.date.between({ from: "2024-01-01", to: Date.now() }),
      rating: generateWeightedRating(),
      comment: faker.lorem.sentences({ min: 1, max: 3 }),
    };
    reviews.push(newReview);
  }
  return reviews;
}

function generateWeightedRating() {
  const rand = Math.random();
  if (rand < 0.5) return 5; // 40% for 5
  if (rand < 0.7) return 4; // 30% for 4
  if (rand < 0.85) return 3; // 15% for 3
  if (rand < 0.95) return 2; // 10% for 2
  return 1; // 5% for 1
}

export function getReviewsScore(reviews: ReviewData[]): number {
  return (
    reviews.reduce((acc, review) => (acc += review.rating), 0) / reviews.length
  );
}

export function getRatingScore(numberOfRatings: number): number {
  if (numberOfRatings <= 0) return 0;

  const getSkewedRating = () => {
    // (median ~4.2)
    let rating = 0;
    do {
      rating = Math.floor(Math.random() * 5 + 1 + Math.random() * 2);
    } while (rating > 5);

    return rating;
  };

  let total = 0;
  for (let i = 0; i < numberOfRatings; i++) {
    total += getSkewedRating();
  }

  return Number((total / numberOfRatings).toFixed(1));
}
