import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodCardProps {
  imageUrl: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMethodCard = ({
  imageUrl,
  buttonText,
  option,
  slug,
}: ConsumptionMethodCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={buttonText}
            fill
            className="object-contain"
          ></Image>
        </div>
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodCard;
