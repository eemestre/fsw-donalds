import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { styleText } from "util";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="px-5 space-y-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href="/"
          className="flex items-center justify-between gap-10 py-3 border-b"
        >
          {/* DIV LEFT */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <h3 className="pt-3 font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </h3>
          </div>

          {/* DIV RIGHT */}
          <div className="relative min-w-[120px] min-h-[82px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
