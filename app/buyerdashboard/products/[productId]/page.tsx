import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "./product-detail";
import { PRODUCTS } from "../../product-data";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ productId: product.id }));
}

export default function BuyerProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 md:px-6">
          Loading product...
        </main>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (item) => item.seller === product.seller && item.id !== product.id
  );

  return (
    <ProductDetail product={product} relatedProducts={relatedProducts} />
  );
}
