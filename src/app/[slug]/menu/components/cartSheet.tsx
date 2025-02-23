import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import CartItem from "./cartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/currency/formatCurrency";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartDrawer from "./cartDrawer";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState<boolean>(false);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%] flex-auto flex flex-col overflow-hidden">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full my-2">
          <div className="space-y-5">
            {products.map((product) => (
              <CartItem key={product.id} item={product} />
            ))}
          </div>
        </ScrollArea>
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-sm font-semibold">{formatCurrency(total)}</p>
            </div>
          </CardContent>
        </Card>
        <Button
          onClick={() => setCartDrawerIsOpen(true)}
          className="w-full rounded-full"
        >
          Finalizar pedido
        </Button>
        <CartDrawer
          open={cartDrawerIsOpen}
          onOpenChange={setCartDrawerIsOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
