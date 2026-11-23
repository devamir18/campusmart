import { Suspense } from "react";
import OrderTracking from "./tracking";

export default function BuyerOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 md:px-6">
          Loading order...
        </main>
      }
    >
      <OrderContent params={params} />
    </Suspense>
  );
}

async function OrderContent({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <OrderTracking orderId={orderId} />;
}
