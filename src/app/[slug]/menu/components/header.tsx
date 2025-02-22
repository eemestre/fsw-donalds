"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const MenuHeader = ({ restaurant }: MenuHeaderProps) => {
  const router = useRouter();

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 rounded-full z-50"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        fill
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        className="object-cover"
      />
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

export default MenuHeader;
