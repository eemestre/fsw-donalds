import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MenuHeader from "./components/header";
import MenuPageCategories from "./components/categories";

interface MenuPageParams {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (value: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(value);
};

const MenuPage = async ({ params, searchParams }: MenuPageParams) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { menuCategories: { include: { products: true } } },
  });

  if (!restaurant || !isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      <MenuHeader restaurant={restaurant} />
      <MenuPageCategories restaurant={restaurant} />
    </div>
  );
};

export default MenuPage;
