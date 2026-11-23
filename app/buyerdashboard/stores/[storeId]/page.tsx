import { Suspense } from "react";
import { notFound } from "next/navigation";
import Storefront from "./storefront";
import { PRODUCTS, STORES } from "../../product-data";

export function generateStaticParams() {
  return STORES.map((store) => ({ storeId: store.id }));
}

export default function BuyerStorePage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 md:px-6">
          Loading store...
        </main>
      }
    >
      <StoreContent params={params} />
    </Suspense>
  );
}

async function StoreContent({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;
  const store = STORES.find((item) => item.id === storeId);

  if (!store) {
    notFound();
  }

  const products = PRODUCTS.filter((product) => product.storeId === store.id);

  return <Storefront store={store} products={products} />;
}
