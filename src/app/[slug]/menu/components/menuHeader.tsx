import { Restaurant } from "@prisma/client";
import Image from "next/image";
interface MenuHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const MenuHeader = ({ restaurant }: MenuHeaderProps) => {
  return (
    <div className="sticky top-0 left-0 h-[250px] w-full ">
      <Image
        fill
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        className="object-cover"
      />
    </div>
  );
};

export default MenuHeader;
