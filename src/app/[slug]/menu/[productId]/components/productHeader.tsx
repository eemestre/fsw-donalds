import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <div className="relative w-full h-[332px] bg-gray-100">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
    </div>
  );
};

export default ProductHeader;
