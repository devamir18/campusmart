"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { PRODUCTS } from "./product-data";

export type BuyerCartItem = {
  productId: string;
  quantity: number;
};

type BuyerCartContextValue = {
  cartItems: BuyerCartItem[];
  cartCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  setCartItemQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const BuyerCartContext = createContext<BuyerCartContextValue | null>(null);

export function BuyerCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<BuyerCartItem[]>([]);

  function addToCart(productId: string, quantity = 1) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) {
      throw new Error(`Cannot add unknown product "${productId}" to the cart.`);
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Cart quantity must be a positive whole number.");
    }
    if (product.stock < 1) {
      throw new Error(`"${product.name}" is currently unavailable.`);
    }

    setCartItems((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (!existing) {
        return [
          ...items,
          { productId, quantity: Math.min(quantity, product.stock) },
        ];
      }

      return items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, product.stock),
            }
          : item
      );
    });
  }

  function setCartItemQuantity(productId: string, quantity: number) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) {
      throw new Error(`Cannot update unknown product "${productId}" in the cart.`);
    }

    if (quantity <= 0) {
      setCartItems((items) =>
        items.filter((item) => item.productId !== productId)
      );
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.floor(quantity), product.stock) }
          : item
      )
    );
  }

  function removeFromCart(productId: string) {
    setCartItems((items) =>
      items.filter((item) => item.productId !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <BuyerCartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        setCartItemQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </BuyerCartContext.Provider>
  );
}

export function useBuyerCart() {
  const context = useContext(BuyerCartContext);
  if (!context) {
    throw new Error("useBuyerCart must be used within BuyerCartProvider.");
  }

  return context;
}
