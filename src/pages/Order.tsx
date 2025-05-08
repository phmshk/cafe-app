import { FC, useEffect, useRef, useState } from "react";
import Menu from "../components/Order/Menu";
import SidePanel from "../components/SidePanel";
import Wrapper from "../components/Wrapper";
import OrderCategories from "../components/Order/OrderCategories";
import LoadingSpinner from "../components/LoadingSpinner";
import useMealsData from "../hooks/useMealsData";
import { getMealCategories, sortMealsByCategory } from "../utils/mealUtils";
import { SortedMealsObj } from "../types/meal";

interface OrderProps {
  mealsOrigin: string;
}

const Order: FC<OrderProps> = ({ mealsOrigin }) => {
  const { meals, isLoading, error } = useMealsData(mealsOrigin);
  const [sortedMeals, setSortedMeals] = useState<SortedMealsObj>({});
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (meals) {
      setSortedMeals(sortMealsByCategory(meals));
      setCategories([...new Set(getMealCategories(meals))]);
    }
  }, [meals]);

  const elementsRef = useRef<HTMLElement[]>([]);
  const [visibleCategory, setVisibleCategory] = useState<string>("");

  const addToObserve = (
    el: HTMLElement,
    refArr: React.RefObject<HTMLElement[]>
  ) => {
    if (el && !refArr.current.includes(el)) {
      refArr.current.push(el);
    }
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setVisibleCategory(entry.target.id);
    });
  };

  const options = {
    rootMargin: "100px 0px -100px 0px",
    threshold: [0.5],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    elementsRef.current.forEach((el) => observer.observe(el));

    return () => {
      elementsRef.current.forEach((el) => observer.unobserve(el));
    };
  }, [sortedMeals, categories]);

  const scrollIntoSection = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    if (e.currentTarget.innerText.toLocaleLowerCase() === category) {
      document.getElementById(category)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>An Error Occured: {error}</div>;
  }
  if (!meals || meals.length === 0) {
    return <div>No meals found</div>;
  }

  return (
    <div className="mt-16">
      <Wrapper>
        <div className="flex gap-4 py-4 relative">
          <SidePanel title="Categories">
            <OrderCategories
              categories={categories}
              onClick={scrollIntoSection}
              visibleCategory={visibleCategory}
            />
          </SidePanel>
          <Menu
            origin={mealsOrigin}
            meals={sortedMeals}
            categories={categories}
            addEl={addToObserve}
            refArr={elementsRef}
          />
          <SidePanel title="Cart">
            <div></div>
          </SidePanel>
        </div>
      </Wrapper>
    </div>
  );
};

export default Order;
