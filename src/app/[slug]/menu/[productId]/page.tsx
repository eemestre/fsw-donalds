import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeader from "./components/productHeader";
import ProductDetails from "./components/productDetails";
import ClientButton from "@/app/components/ClientButton";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product || !product?.restaurant) {
    return notFound();
  }

  if (product.restaurant.slug != slug) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <ClientButton type="back" />
      <ClientButton type="scroll" />
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
