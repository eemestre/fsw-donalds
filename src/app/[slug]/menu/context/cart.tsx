"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface ICartItem
  extends Pick<Product, "name" | "id" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: ICartItem[];
  toggleCart: (value?: boolean) => void;
  addProduct: (product: ICartItem) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ICartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = (value?: boolean) => {
    if (typeof value === "undefined") {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(value);
    }
  };

  const addProduct = (product: ICartItem) => {
    const isOnCart = products.some((p) => p.id === product.id);
    if (!isOnCart) {
      setProducts([...products, product]);
    } else {
      setProducts((prev) => {
        return prev.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + product.quantity,
            };
          }
          return p;
        });
      });
    }
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
