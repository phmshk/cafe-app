import { FC, useMemo, useState } from "react";
import MealCard from "../Meal/MealCard";
import { SortedMealsObj } from "../../types/meal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import ReviewsContent from "../ReviewsModal/ReviewsContent";
import {
  createReviews,
  getRatingScore,
  getReviewsScore,
  ReviewData,
} from "../../utils/review";
import { faker } from "@faker-js/faker";
import MenuSection from "./MenuSection";

interface MenuProps {
  meals: SortedMealsObj;
  categories: string[];
  origin: string;
}

const Menu: FC<MenuProps> = ({ origin, meals, categories }) => {
  const ratingContainerClasses =
    "flex items-center gap-4 shadow p-2 bg-white/50 hover:bg-white/80 rounded-2xl max-w-28 cursor-pointer";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews] = useState<ReviewData[]>(() => createReviews(20));
  const [numberOfRatings] = useState(faker.number.int({ min: 80, max: 150 }));

  const onClick = () => {
    setIsModalOpen(false);
    document.body.classList.toggle("scrolling-disabled");
  };

  const { restaurantScore, totalReviews } = useMemo(() => {
    const reviewsScore = getReviewsScore(reviews) || 5;
    const restaurantScore = (
      (getRatingScore(numberOfRatings) + reviewsScore) /
      2
    ).toFixed(1);
    return {
      restaurantScore,
      totalReviews: reviews.length + numberOfRatings,
    };
  }, [reviews, numberOfRatings]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClick={onClick}
        modalContentStyles="max-w-3/7 bg-base-300 p-0"
      >
        <ReviewsContent
          onClick={onClick}
          reviews={reviews}
          restaurantScore={restaurantScore}
          totalRatings={numberOfRatings}
        />
      </Modal>
      <div className="p-4 rounded-2xl">
        <div className="w-full h-48 rounded-2xl gradient flex flex-col justify-end p-4">
          <h2 className="text-4xl font-bold my-4">{origin} Kitchen</h2>
          <div
            role="button"
            className={ratingContainerClasses}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="text-shadow-base-300 text-3xl">
              <FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
            <div className="flex flex-col">
              <div className="text-primary">{restaurantScore}</div>
              <div className="">{totalReviews}</div>
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <MenuSection category={category} key={category}>
            {meals[category].map((meal) => (
              <MealCard meal={meal} key={meal.idMeal} />
            ))}
          </MenuSection>
        ))}
      </div>
    </>
  );
};

export default Menu;
