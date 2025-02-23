"use client";

import { Prisma } from "@prisma/client";
import { useContext, useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/helpers/currency/formatCurrency";
import { Button } from "@/components/ui/button";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "../../context/cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartSheet from "../../components/cartSheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart } = useContext(CartContext);
  const increase = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    toggleCart();
  };

  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] bg-white flex-auto flex flex-col overflow-hidden">
        <div className="flex-auto">
          {/* RESTAURANT */}
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          {/* PRODUCT NAME */}
          <h2 className="text-xl mt-1 font-semibold">
            {product.restaurant.name}
          </h2>

          {/* PRICE AND QUANTITY  */}
          <div className="flex items-center justify-between mt-3">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={decrease}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={increase}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="h-full my-3">
          {/* DESCRIPTION */}
          <div className="space-y-2">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* INGREDIENTS */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
              <ChefHatIcon />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="list-disc px-5">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="text-sm text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>

        {/* ADICIONAR À SACOLA */}
        <Button className="rounded-full w-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
