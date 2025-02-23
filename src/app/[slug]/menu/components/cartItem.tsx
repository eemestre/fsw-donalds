import { formatCurrency } from "@/helpers/currency/formatCurrency";
import { ICartItem } from "../context/cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-start gap-3">
        {/* ITEM IMAGE */}
        <div className="relative w-[77px] h-[77px] bg-gray-100 rounded-lg">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        {/* NAME, PRICE AND QUANTITY */}
        <div className="space-y-1">
          <p className="text-sm max-w-[90%] truncate text-ellipsis">
            {item.name}
          </p>
          <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>
          {/* QUANTITY */}
          <div className="flex items-center text-center gap-1">
            <Button variant="outline" className="h-7 w-7 rounded-lg">
              <ChevronLeftIcon />
            </Button>
            <p className="text-xs w-7 ">{item.quantity}</p>
            <Button variant={"destructive"} className="h-7 w-7 rounded-lg">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <Button variant="outline" className="h-7 w-7 rounded-lg">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartItem;
