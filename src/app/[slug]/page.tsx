import { getRestaurantBySlug } from "@/data/getRestaurantBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodCard from "./components/ConsumptionMethodCard";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
        {/* LOGO AND RESTAURANT NAME */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
          />
          <h2 className="font-semibold">{restaurant.name}</h2>
        </div>
        {/* BEM VINDO TEXT */}
        <div className="pt-24 text-center space-y-2">
          <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
          <p>
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
          </p>
        </div>
        {/* ORDER METHOD */}
        <div className="pt-14 grid grid-cols-2 gap-4">
          {/* DINE-IN CARD */}
          <ConsumptionMethodCard
            imageUrl="/dine_in.png"
            buttonText="Para comer aqui"
            option="DINE_IN"
            slug={slug}
          />
          {/* TAKE AWAY CARD */}
          <ConsumptionMethodCard
            imageUrl="/takeaway.png"
            buttonText="Para levar"
            option="TAKEAWAY"
            slug={slug}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
