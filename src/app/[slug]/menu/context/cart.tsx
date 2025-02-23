"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface ICartItem
  extends Pick<Product, "name" | "id" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  total: number;
  isOpen: boolean;
  products: ICartItem[];
  toggleCart: (value?: boolean) => void;
  addProduct: (product: ICartItem) => void;
  decreaseProductQuantity: (id: string) => void;
  increaseProductQuantity: (id: string) => void;
  removeProduct: (id: string) => void;
}

export const CartContext = createContext<ICartContext>({
  total: 0,
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ICartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const total = products.reduce((acc, p) => {
    return acc + p.price * p.quantity;
  }, 0);

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

  const decreaseProductQuantity = (id: string) => {
    let q: number = 1;
    setProducts((prev) => {
      return prev.map((p) => {
        if (p.id === id) {
          q = p.quantity - 1;
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      });
    });
    if (q === 0) {
      removeProduct(id);
    }
  };

  const increaseProductQuantity = (id: string) => {
    setProducts((prev) => {
      return prev.map((p) => {
        if (p.id === id && p.quantity < 99) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });
    });
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((prev) => prev.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
