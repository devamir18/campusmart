"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { BuyerCartItem } from "./cart-context";
import { PRODUCTS, STORES } from "./product-data";

export type BuyerOrderStatus = "preparing" | "on-the-way" | "delivered";
export type BuyerFulfillment = "delivery" | "pickup";

export type BuyerOrder = {
  id: string;
  storeId: string;
  storeName: string;
  storeVerified: boolean;
  pickupPoint: string;
  fulfillment: BuyerFulfillment;
  address: string;
  customerName: string;
  phone: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    image: string;
    imageAlt: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedTime: string;
  placedAt: number;
  preparingAt: number;
  onTheWayAt: number | null;
  deliveredAt: number | null;
  status: BuyerOrderStatus;
  deliveryConfirmed: boolean;
};

type CreateDemoOrderInput = {
  storeId: string;
  items: BuyerCartItem[];
  fulfillment: BuyerFulfillment;
  address: string;
  customerName: string;
  phone: string;
};

type BuyerOrdersContextValue = {
  orders: BuyerOrder[];
  createDemoOrder: (input: CreateDemoOrderInput) => string;
  advanceDemoOrder: (orderId: string) => void;
  confirmDemoDelivery: (orderId: string) => void;
};

const BuyerOrdersContext = createContext<BuyerOrdersContextValue | null>(null);

export function BuyerOrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<BuyerOrder[]>([]);
  const nextOrderNumber = useRef(2087);

  function createDemoOrder(input: CreateDemoOrderInput) {
    const store = STORES.find((item) => item.id === input.storeId);
    if (!store) {
      throw new Error(`Cannot create an order for unknown store "${input.storeId}".`);
    }
    if (input.items.length === 0) {
      throw new Error("Cannot create an order without items.");
    }
    if (input.fulfillment === "delivery" && !store.deliveryAvailable) {
      throw new Error(`${store.name} does not offer delivery.`);
    }

    const items = input.items.map((cartItem) => {
      const product = PRODUCTS.find(
        (item) =>
          item.id === cartItem.productId && item.storeId === input.storeId
      );
      if (!product) {
        throw new Error(
          `Product "${cartItem.productId}" is not available from ${store.name}.`
        );
      }

      return {
        productId: product.id,
        name: product.name,
        quantity: cartItem.quantity,
        unitPrice: product.price,
        image: product.image,
        imageAlt: product.imageAlt,
      };
    });

    const now = Date.now();
    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const deliveryFee =
      input.fulfillment === "delivery" ? store.deliveryFee : 0;
    const id = String(nextOrderNumber.current++);

    const order: BuyerOrder = {
      id,
      storeId: store.id,
      storeName: store.name,
      storeVerified: store.isVerified,
      pickupPoint: store.pickupPoint,
      fulfillment: input.fulfillment,
      address:
        input.fulfillment === "delivery"
          ? input.address.trim()
          : store.pickupPoint,
      customerName: input.customerName.trim(),
      phone: input.phone.trim(),
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      estimatedTime: store.estimatedTime,
      placedAt: now,
      preparingAt: now,
      onTheWayAt: null,
      deliveredAt: null,
      status: "preparing",
      deliveryConfirmed: false,
    };

    setOrders((current) => [order, ...current]);
    return id;
  }

  function advanceDemoOrder(orderId: string) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        if (order.status === "preparing") {
          return {
            ...order,
            status: "on-the-way",
            onTheWayAt: Date.now(),
          };
        }
        if (order.status === "on-the-way") {
          return {
            ...order,
            status: "delivered",
            deliveredAt: Date.now(),
          };
        }

        return order;
      })
    );
  }

  function confirmDemoDelivery(orderId: string) {
    const order = orders.find((item) => item.id === orderId);
    if (!order) {
      throw new Error(`Cannot confirm unknown order "${orderId}".`);
    }
    if (order.status !== "delivered") {
      throw new Error("Delivery can only be confirmed after the order is delivered.");
    }

    setOrders((current) =>
      current.map((item) =>
        item.id === orderId ? { ...item, deliveryConfirmed: true } : item
      )
    );
  }

  return (
    <BuyerOrdersContext.Provider
      value={{
        orders,
        createDemoOrder,
        advanceDemoOrder,
        confirmDemoDelivery,
      }}
    >
      {children}
    </BuyerOrdersContext.Provider>
  );
}

export function useBuyerOrders() {
  const context = useContext(BuyerOrdersContext);
  if (!context) {
    throw new Error("useBuyerOrders must be used within BuyerOrdersProvider.");
  }

  return context;
}
