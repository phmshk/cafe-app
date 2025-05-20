import { createFileRoute } from "@tanstack/react-router";
import Order from "../pages/Order";

export const Route = createFileRoute("/$category")({
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  return <Order mealsOrigin={category} />;
}
