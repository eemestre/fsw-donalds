import { db } from "@/lib/prisma";
import { isValidCpf } from "../menu/helpers/cpf";
import CpfForm from "./components/cpfForm";
import OrderList from "./components/orderList";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import OrderListHeader from "./components/orderListHeader";

interface OrderPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams, params }: OrderPageProps) => {
  const { slug } = await params;
  const { cpf } = await searchParams;

  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: cpf,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col h-full p-6">
      <OrderListHeader slug={slug} />
      <OrderList orders={orders} slug={slug} />
    </div>
  );
};

export default OrdersPage;
