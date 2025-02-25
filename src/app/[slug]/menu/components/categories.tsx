"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ConsumptionMethod, Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import Products from "./products";
import { CartContext } from "../context/cart";
import { formatCurrency } from "@/helpers/currency/formatCurrency";
import CartSheet from "./cartSheet";

interface MenuCategoriesProps {
  consumptionMethod: ConsumptionMethod;
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const MenuPageCategories = ({
  restaurant,
  consumptionMethod,
}: MenuCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);
  const { products, total, toggleCart, totalQuantity } =
    useContext(CartContext);

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
          />
          <div>
            <h2 className="font-semibold text-lg">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-ful">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory.id === category.id ? "default" : "secondary"
              }
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={"rounded-full"}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="font-semibold px-5 pt-2">{selectedCategory.name}</h3>
      <Products
        products={selectedCategory.products}
        slug={restaurant.slug}
        consumptionMethod={consumptionMethod}
      />

      {products.length > 0 && (
        <>
          <div className="sticky bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-4">
            <div>
              <p className="text-xs text-muted-foreground">Total dos pedidos</p>
              <p className="text-sm font-semibold">
                {formatCurrency(total)}
                <span className="text-xs fonr-normal text-muted-foreground">
                  {" "}
                  / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                </span>
              </p>
            </div>
            <Button onClick={() => toggleCart()}>Ver sacola</Button>
          </div>
          <CartSheet />
        </>
      )}
    </div>
  );
};

export default MenuPageCategories;
