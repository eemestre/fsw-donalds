"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import OrderComponent from "./orderComponent";
import { redirect } from "next/navigation";

interface OrderListProps {
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

const OrderList = ({ orders }: OrderListProps) => {
  //const router = redirect(`/${}`);

  return (
    <div className="flex-auto flex flex-col overflow-hidden">
      <div className="flex flex-col justify-center">
        <Button size="icon" variant="secondary" className="rounded-full">
          <ChevronLeftIcon />
        </Button>
        <div className="flex items-center gap-2 py-6">
          <ScrollTextIcon />
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        </div>
      </div>
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
