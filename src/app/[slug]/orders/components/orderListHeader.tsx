"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { redirect } from "next/navigation";

interface OrderListHeaderProps {
  slug: string;
}

const OrderListHeader = ({ slug }: OrderListHeaderProps) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <Button
          onClick={() => redirect(`/${slug}`)}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <ChevronLeftIcon />
        </Button>
        <div className="flex items-center gap-2 py-6">
          <ScrollTextIcon />
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        </div>
      </div>
    </>
  );
};

export default OrderListHeader;
