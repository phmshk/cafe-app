import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchMealAreas } from "../API/mealService";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [countries, setCountries] = useState<string[]>([]);

  const calculateSlideNumber = (index: number, arrLength: number) => {
    if (index === 0) return [arrLength, 2];
    if (index === arrLength - 1) return [index, 1];
    return [index, index + 2];
  };

  useEffect(() => {
    const fetchAreas = async () => {
      const areas = await fetchMealAreas();
      setCountries(areas);
    };
    fetchAreas();
  }, []);

  return (
    <>
      <div className="my-4">
        <div className="carousel w-3xs">
          {countries.map((country, index) => (
            <div
              id={`slide${index + 1}`}
              className="carousel-item relative w-full h-16 felx justify-center items-center"
              key={country}
            >
              <Link
                to="/$category"
                params={{ category: country }}
                className="cursor-pointer"
              >
                {country}
              </Link>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`#slide${calculateSlideNumber(index, countries.length)[0]}`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${calculateSlideNumber(index, countries.length)[1]}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
