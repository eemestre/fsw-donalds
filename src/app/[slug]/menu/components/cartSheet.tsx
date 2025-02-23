import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cartItem";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        {products.map((product) => (
          <div className="py-5">
            <CartItem key={product.id} item={product} />
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
