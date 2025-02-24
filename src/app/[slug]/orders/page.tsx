import { db } from "@/lib/prisma";
import { isValidCpf } from "../menu/helpers/cpf";
import CpfForm from "./components/cpfForm";
import OrderList from "./components/orderList";

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
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
