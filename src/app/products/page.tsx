"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ProductsPage = () => {
  const [num, setNum] = useState(0);

  return (
    <div className="p-6 gap-5">
      <h1>Clique no botão!</h1>
      <Button onClick={() => setNum(num + 1)}>{num}</Button>
      <Input />
    </div>
  );
};

export default ProductsPage;
