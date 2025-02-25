import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import OrderComponent from "./orderComponent";

interface OrderListProps {
  slug: string;
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: {
              select: {
                name: true;
              };
            };
          };
        };
      };
    }>
  >;
}

const OrderList = ({ orders, slug }: OrderListProps) => {
  return (
    <div className="flex-auto flex flex-col overflow-hidden">
      <ScrollArea className="h-full px-4">
        <div className="space-y-6">
          {orders.map((o) => (
            <OrderComponent key={o.id} order={o} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default OrderList;
