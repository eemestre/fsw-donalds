import { formatCurrency } from "@/helpers/currency/formatCurrency";
import { CartContext, ICartItem } from "../context/cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-start gap-3">
        {/* IMAGE */}
        <div className="relative min-w-[75px] min-h-[75px] bg-gray-100 rounded-lg">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        {/* NAME, PRICE AND QUANTITY */}
        <div className="space-y-1">
          {/* NAME */}
          <p className="text-sm w-[90%] line-clamp-1">{item.name}</p>

          {/* PRICE */}
          <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>

          {/* QUANTITY */}
          <div className="flex items-center text-center gap-1">
            <Button
              onClick={() => decreaseProductQuantity(item.id)}
              variant="outline"
              className="h-7 w-7 rounded-lg"
            >
              <ChevronLeftIcon />
            </Button>
            <p className="text-xs w-7 ">{item.quantity}</p>
            <Button
              onClick={() => increaseProductQuantity(item.id)}
              variant={"destructive"}
              className="h-7 w-7 rounded-lg"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <Button
        onClick={() => removeProduct(item.id)}
        variant="outline"
        className="h-7 w-7 rounded-lg"
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartItem;
