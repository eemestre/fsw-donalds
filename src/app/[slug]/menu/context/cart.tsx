"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct
  extends Pick<Product, "name" | "id" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: (value?: boolean) => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = (value?: boolean) => {
    if (typeof value === "undefined") {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(value);
    }
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
