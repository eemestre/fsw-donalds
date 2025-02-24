import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/currency/formatCurrency";
import { OrderStatus, Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderComponentProps {
  order: Prisma.OrderGetPayload<{
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
  }>;
}

const OrderComponent = ({ order }: OrderComponentProps) => {
  const getStatusLabel = (status: OrderStatus) => {
    if (status === "FINISHED") {
      return "FINALIZADO";
    } else if (status === "IN_PREPARATION") {
      return "PREPARANDO";
    } else {
      return "PENDENTE";
    }
  };

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div
          className={`w-fit  rounded-full px-2 py-1 text-xs font-semibold
            ${
              order.status === OrderStatus.FINISHED
                ? "bg-green-500 text-white"
                : order.status === OrderStatus.PENDING
                ? "bg-gray-200 text-gray-500"
                : "bg-yellow-500 text-white"
            }
            `}
        >
          {getStatusLabel(order.status)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              src={order.restaurant.avatarImageUrl}
              alt={order.restaurant.name}
              className="rounded-sm"
              fill
            />
          </div>
          <p className="font-semibold text-sm">{order.restaurant.name}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          {order.orderProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <div className="min-h-5 min-w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                {p.quantity}
              </div>
              <p className="text-sm line-clamp-1">{p.product.name}</p>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderComponent;
