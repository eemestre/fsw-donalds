"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="relative w-full h-[332px] bg-slate-200">
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full z-50"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </Button>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 rounded-full z-50"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
