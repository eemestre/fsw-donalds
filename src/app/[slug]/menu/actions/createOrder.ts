"use server";

import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { removeCpfPunctuation } from "../helpers/cpf";
import { redirect } from "next/navigation";

interface CreateOrderProps {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (props: CreateOrderProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: props.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant no found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: props.products.map((p) => p.id),
      },
    },
  });

  const productsWithPricesAndQuantities = props.products.map((p) => ({
    productId: p.id,
    quantity: p.quantity,
    price: productsWithPrices.find((p2) => p2.id === p.id)!.price,
  }));

  await db.order.create({
    data: {
      consumptionMethod: props.consumptionMethod,
      status: "PENDING",
      customerName: props.customerName,
      customerCpf: removeCpfPunctuation(props.customerCpf),
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      ),
    },
  });

  redirect(`/${props.slug}/orders`);
};
