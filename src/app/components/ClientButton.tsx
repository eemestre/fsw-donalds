"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import router, { useRouter } from "next/navigation";

interface ClientButtonProps {
  type: string;
}

const ClientButton = ({ type }: ClientButtonProps) => {
  const router = useRouter();

  if (type === "back") {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="fixed top-4 left-4 rounded-full z-50"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
    );
  } else if (type === "scroll") {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="fixed top-4 right-4 rounded-full z-50"
      >
        <ScrollTextIcon />
      </Button>
    );
  } else {
    return <></>;
  }
};

export default ClientButton;
