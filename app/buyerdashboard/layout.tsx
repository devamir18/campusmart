import type { ReactNode } from "react";
import { BuyerAccountProvider } from "./account-context";
import { BuyerCartProvider } from "./cart-context";
import { BuyerOrdersProvider } from "./orders-context";

export default function BuyerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <BuyerAccountProvider>
      <BuyerOrdersProvider>
        <BuyerCartProvider>{children}</BuyerCartProvider>
      </BuyerOrdersProvider>
    </BuyerAccountProvider>
  );
}
