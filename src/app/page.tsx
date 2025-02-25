"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    redirect("/fsw-donalds");
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-xl">Redirecionado para FSW Donalds</h1>
    </div>
  );
};

export default Home;
